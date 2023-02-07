import React, { useContext } from "react";
import ApiCaller from "../interceptor";
import VisibilityContext from "../../state-manager/visibilityProvider";
import UserContext from "../../state-manager/userProvider";
import axios from "axios";
const ApiContext = React.createContext(null);

export const ApiProvider = (props) => {
  const { loader } = useContext(VisibilityContext);
  const { user, setUserProperty,setAllListing,setExpiration } = useContext(UserContext);

  async function signin(payload) {
    try {
      loader(true);
      const { data } = await ApiCaller.post("/users/login", payload);
      loader(false);
      if (data.token) {
        await setUserProperty("profile", { ...user.profile, ...data });
        await setUserProperty("token", data.token);
        await setExpiration(new Date().getTime() + 2*60*60*1000)
        return true;
      } else {
        alert("error");
        return false;
      }
    } catch (err) {
      loader(false);
      alert(err);
    }
  }
  async function signup(payload) {
    try {
      loader(true);
      const response = await ApiCaller.post("users/register", payload);
      loader(false);
      if (response.data.id) {
        alert("Successfully created an account!");
        console.log(response)
        return true;
      } else {
        alert("Something went wrong");
        return false;
      }
    } catch (err) {
      loader(false);
      alert(err);
    }
  }

  async function addListing(payload) {
    try {
      loader(true);
    //   const listing = new FormData();
    //   listing.append("title", payload.title);
    //   listing.append("number", payload.number);
    //   listing.append("link", payload.link);
    //   listing.append("description", payload.description);
    //   listing.append("email", payload.email);
    //   listing.append("image", file);
    //   console.log(listing)

      const response = await axios
        .post("https://whatsapptv.cyclic.app/API/v1/listing", payload, {
          headers: {
            Authorization:`Bearer ${user.token}`,
          },
        })
        .then((response) => {
          loader(false);
        response && alert('Succesfully Added!')
        });
    } catch (err) {
      loader(false);
      alert(err);
    }
  }
async function fetchAllListing () {
  try {
 loader(true);
const response = await ApiCaller.get('listing');
loader(false);
if(response.status === 200) {
  setAllListing(response.data)
  return true
}
else {
  alert('Something went wrong!')
}
  } catch(err) {
  loader(false);
  //alert(err)
  }
}
async function updateCategory(payload,id) {
  try{
loader(true);
const response = await ApiCaller.put(`/admin/${id}`,{category: payload} , {
  headers:{
    Authorization: `Bearer ${user.token}`
  }
});
loader(false)
console.log(response)
if(response.status === 200) {
  alert('Succesfully changed')
  window.location.reload(true)
    fetchAllListing();

  return true
}
else {
  alert('Something went wrong!')
}
  } 
  catch(err) {
loader(false);
alert(err)
  }
}
async function deleteTV(id) {
  try{
 loader(true)
 const response = await ApiCaller.delete(`admin/${id}`, {headers:{
  Authorization: `Bearer ${user.token}`
 }})
 loader(false)
 if(response.status === 200) {
  alert('Succesfully deleted a TV!')
  fetchAllListing()
  return true
 } else {
  return false
 }
  } catch(err) {
loader(false);

  }
}

  const callActions = {
    signin,
    signup,
    addListing,
    fetchAllListing,
    updateCategory,
    deleteTV
  };
  return (
    <ApiContext.Provider value={{ API: callActions }}>
      {props.children}
    </ApiContext.Provider>
  );
};
export default ApiContext;
