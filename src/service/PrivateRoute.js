import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import PasswordReset from "../pages/PasswordReset";


const PrivateRoute = () => {
  let token = localStorage.getItem("user");
  let auth = null;

  let toke = null

  if(token.length <6){
    toke = true
  }


  if (!token > 6) {
    auth = { token: false };
  }  {
    auth = { token: true };
  }

  return toke ? <PasswordReset /> : auth.token ? <Outlet /> : <Login />;
};

export default PrivateRoute;
