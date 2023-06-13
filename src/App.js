import "./App.css";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Service from "./pages/Service";
import { useState } from "react";
import PrivateRoute from "./service/PrivateRoute";
import Layout from "./components.js/Layout";
import Report from "./pages/Report";
import Feedback from "./pages/Feedback";
import PasswordReset from "./pages/PasswordReset";


function App() {
  //registerform
  const [register, setRegister] = useState(false);
  //passwordresetform
  const[pwReset, setpwReset] = useState(false)
  return (
    <>
  
        <BrowserRouter>
          <Routes>
            <Route index element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/passwordreset" element={<PasswordReset/>}/>
            <Route path="/feedback" element={<Feedback/>}/>
            <Route element={<PrivateRoute/>}>
              <Route path="/" element={<Layout register={register} setRegister={setRegister} pwReset={pwReset} setpwReset={setpwReset}/>}>
            <Route path="service" element={<Service />} />
            <Route path="report" element={<Report />}/>
            </Route>
            </Route>
          </Routes>
        </BrowserRouter>

    </>
  );
}

export default App;
