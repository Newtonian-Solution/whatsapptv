import React, { useContext } from "react";
import ApiCaller from "../interceptor";
import VisibilityContext from "../../state-manager/visibilityProvider";
import UserContext from "../../state-manager/userProvider";
import axios from "axios";
const ApiContext = React.createContext(null);

export const ApiProvider = (props) => {
  const { loader, notifier } = useContext(VisibilityContext);
  const { user, setUserProperty, setAllListing, logout } =
    useContext(UserContext);

  async function signin(payload) {
    try {
      loader(true);
      const response = await ApiCaller.post("/users/login", payload);
      loader(false);
      console.log(response)
      if (response.data.token) {
        await setUserProperty("profile", { ...user.profile, ...response.data });
        await setUserProperty("token", response.data.token);
        await setUserProperty('tokenExpire', new Date().getTime() + 10 * 60 * 60 * 1000)
        //  localStorage.setItem("token2", response.data.token)
        //  localStorage.setItem('tokenExpire', new Date().getTime() + 10 * 60 * 60 * 1000)
        return true;
      } else {
        alert("error");
        return false;
      }
    } catch (err) {
      loader(false);
      console.log(err)
      notifier.show(err?.response?.data || err.message,'Error','error');
      // alert(err);
    }
  }
  async function signup(payload) {
    try {
      loader(true);
      const response = await ApiCaller.post("users/register", payload);
      loader(false);
      if (response.data.id) {
        alert("Successfully created an account!");
        console.log(response);
        return true;
      } else {
        alert("Something went wrong");
        return false;
      }
    } catch (err) {
      loader(false);
      notifier.show(err?.response?.data || err.message, "Error", "error");


      //  alert(err);
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
        .post("https://watv-backend.onrender.com/api/v1/listing", payload, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          loader(false);
          response && notifier.show('Successfully Added', 'Success', 'success')
        });
    } catch (err) {
      loader(false);
      if(err.status === 500) notifier.show('Something went wrong (Server)')
      notifier.show(err?.response?.data || err.message, "Error", "error");

    }
  }
  async function fetchAllListing() {
    try {
      loader(true);
      const response = await ApiCaller.get("listing");
      loader(false);
      if (response.status === 200) {
        setAllListing(response.data);
        return true;
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      loader(false);
    if (err.status === 500) notifier.show("Something went wrong (Server)");

      notifier.show(err?.response?.data || err.message, 'Error', 'error')
      //alert(err)
    }
  }
  async function updateCategory(payload, id) {
    try {
      loader(true);
      const response = await ApiCaller.put(
        `/admin/${id}`,
        { category: payload },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      loader(false);
      console.log(response);
      if (response.status === 200) {
        notifier.show('Successfully Changed', 'Success', 'success');
        //window.location.reload(true);
        fetchAllListing();

        return true;
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      loader(false);
      console.log(err)
      if(err.response.status === 401) {
         logout()
        
        notifier.show("Please login again, Please log in again", "Error", "error");
        window.location.href = "/signin";
      }
     if (err.status === 500) notifier.show("Something went wrong (Server)");

      notifier.show(err?.response?.data || err.message, 'Error', 'error');

      //alert(err);
    }
  }
  async function deleteTV(id) {
    try {
      loader(true);
      const response = await ApiCaller.delete(`admin/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      loader(false);
      if (response.status === 200) {
        notifier.show('Successfully deleted a TV', 'Success', 'success');
        //window.location.reload(true);

        fetchAllListing();
        return true;
      } else {
        return false;
      }
    } catch (err) {
      loader(false);
 if (err.status === 500) notifier.show("Something went wrong (Server)");

      notifier.show(err?.response.data || err.message, 'Error', 'error');
    }
  }

  const callActions = {
    signin,
    signup,
    addListing,
    fetchAllListing,
    updateCategory,
    deleteTV,
  };
  return (
    <ApiContext.Provider value={{ API: callActions }}>
      {props.children}
    </ApiContext.Provider>
  );
};
export default ApiContext;
