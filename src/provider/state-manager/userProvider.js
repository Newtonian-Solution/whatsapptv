import React, { useReducer } from "react";
const initialState = {
  token: "",
  profile: {},
  allListing:[],
  tokenExpire:0
};
const UserContext = React.createContext(null);

const UserReducer = (state, action) => {
  switch (action.type) {
    case "set-property":
      return { ...state, [action.payload.key]: action.payload.value };
    case "clear-user-data":
      return { ...initialState };
  }
};

export const UserProvider = (props) => {
    const [state, dispatch] = useReducer(UserReducer, {
       ...initialState
    })

    async function setUserProperty (key, value) {
        let val = typeof(value) === 'string' ? value : typeof(value) === 'number' ? String(value) : JSON.stringify(value)
        await dispatch({type: "set-property", payload: {key, value}})
        localStorage.setItem(key, val)
    }

    async function recoverUserData() {
        for (let item of Object.keys(initialState)) {
            let retrievedData = await localStorage.getItem(item)
            retrievedData = ['number', 'string'].includes(typeof state[item]) ? retrievedData : ( !['null', 'undefined'].includes(retrievedData) ? JSON.parse(retrievedData): state[item])
            await setUserProperty(item, retrievedData)
        }
    }
async function setAllListing(value) {
    await dispatch({type:"set-property", payload:{key:"allListing", value}})
}
async function setExpiration(value) {
    await dispatch({type:"set-property", payload:{key:"tokenExpire", value}})
}
    async function clearuserData() {
        await dispatch({type: "clear-user-data", payload: null})
    }
    async function logout() {
        await Promise.all([
            localStorage.clear(), clearuserData()
        ])
    }

    const actions = {
        setUserProperty,
        recoverUserData,
        clearuserData,
        logout,
        setAllListing,
        setExpiration
    }

    return (
        <UserContext.Provider value={{user: state, ...actions}} >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext