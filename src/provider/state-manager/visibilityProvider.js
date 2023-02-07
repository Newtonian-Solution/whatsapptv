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
  });

  async function loader(value) {
    await dispatch({
      type: "set-visibility",
      payload: { key: "isLoading", value },
    });
  }
  const stateActions = {
    loader,
  };

   return (
     <VisibilityContext.Provider value={{ visibility: state, ...stateActions }}>
       {props.children}
     </VisibilityContext.Provider>
   );
};
export default VisibilityContext