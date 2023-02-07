import React, { useContext } from "react";
import { Notifier } from "../Notifier";
import { Loader } from "../loader";
import VisibilityContext from "../../provider/state-manager/visibilityProvider";
export const PopUps = () => {
  const { visibility } = useContext(VisibilityContext);

  return (
    <>
      {visibility.isLoading ? <Loader /> : null}
      <Notifier />
    </>
  );
};
