import { Puff } from "react-loader-spinner";
import "./index.scss";

export const Loader= () => {
  return (
    <div className="loader-container">
      <div className="loader-wrapper">
        <Puff color="orange" height={100} width={100} />
      </div>
    </div>
  );
};
