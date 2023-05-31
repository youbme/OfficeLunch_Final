import {  Outlet } from "react-router-dom";
import Login from "../pages/Login";


const PrivateRoute = () => {
  const token = localStorage.getItem("user");
  let auth = null;
  if (!token) {
    auth = { token: false };
  } else {
    auth = { token: true };
  }

  return auth.token ? <Outlet /> : <Login />;
};
export default PrivateRoute;
