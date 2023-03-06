import React, { Reducer, useReducer } from "react";
const VisibilityContext = React.createContext({});

const VisibilityReducer = (state, action) => {
  switch (action.type) {
    case "set-visibility":
      return { ...state, [action.payload.key]: action.payload.value };
    case "logout":
      return {};
  }
};
export const VisibilityProvider = (props) => {
  const [state, dispatch] = useReducer(VisibilityReducer, {
    isLoading: false,
    notification: { status: false, message: "", title: "", type: "success" },
  });

  async function loader(value) {
    await dispatch({
      type: "set-visibility",
      payload: { key: "isLoading", value },
    });
  }
  const notifier = {
    show: async function (message, title, type) {
      const messageType = type ? type.toLowerCase() : "error";
      const messageTitle = title
        ? title
        : title === null
        ? messageType === "success"
          ? "Success Response"
          : "Error Response"
        : "";
      await dispatch({
        type: "set-visibility",
        payload: {
          key: "notification",
          value: {
            status: message ? true : false,
            message,
            type: messageType,
            title: messageTitle,
          },
        },
      });
    },
    hide: async function () {
      await dispatch({
        type: "set-visibility",
        payload: {
          key: "notification",
          value: {
            status: false,
            message: state.notification.message,
            type: state.notification.type,
            title: state.notification.title,
          },
        },
      });
    },
  };
  const stateActions = {
    loader,
    notifier
  };

   return (
     <VisibilityContext.Provider value={{ visibility: state, ...stateActions }}>
       {props.children}
     </VisibilityContext.Provider>
   );
};
export default VisibilityContext