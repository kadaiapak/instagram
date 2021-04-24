import { Route, Redirect } from "react-router-dom";

const ProtectRouter = (props) => {
  const firstLogin = localStorage.getItem("firstLogin");

  return firstLogin ? <Route {...props} /> : <Redirect to="/" />;
  // return <Route {...props} />;
};

export default ProtectRouter;
