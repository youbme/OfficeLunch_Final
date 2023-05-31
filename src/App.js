import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Service from "./pages/Service";

import PrivateRoute from "./service/PrivateRoute";


function App() {
  
  return (
    <>
  
        <BrowserRouter>
          <Routes>
            <Route index element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute/>}>
            <Route path="/service" element={<Service />} />
            </Route>
          </Routes>
        </BrowserRouter>

    </>
  );
}

export default App;
