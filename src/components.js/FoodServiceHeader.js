import {React} from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import jwtDecode from 'jwt-decode'
//picturesimport
import AccessSystem from '../img/Accesssystem.png'
import Profile from '../img/profile-img.jpg'

import { useNavigate } from 'react-router-dom';
import RegisterModal from './RegisterModal';


import Gp from "../js/main";
import { useEffect } from 'react'

export default function FoodServiceHeader({register, setRegister}) {

    //navigate
    const navigate = useNavigate();

    

    //username
    const [username, setUsername] = useState('');
    //checkingifloggedinuserisADMIN
  const [loggedAdmin, setloggedAdmin] = useState(false);
  //gettting Storage data
  const token = localStorage.getItem("user");
  //Checking roles if it is user or admin and username
  const checkRoles = () => {
    const decoded = jwtDecode(token);
    const user = decoded.sub;
    setUsername(user);
    //checking roles
    const roles = decoded.roles;
    for (let role of roles) {
      if (role === "ROLE_ADMIN") {
        setloggedAdmin(true);
        break;
      }
    }
  };

//usestate for signup button dropdown
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const handleDropdownToggle = () => {
  setIsDropdownOpen(!isDropdownOpen);
};


//useeffect
useEffect(() => {
   
    Gp();
     //checkingifadminisloggedin
     checkRoles();
   
  }, []);

 //Signout function
 const onSignout = async (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  
  return (
    <>

<header id="header" class="header fixed-top d-flex align-items-center">
        <div class="d-flex align-items-center justify-content-between">
          <Link to={"/"} class="logo d-flex align-items-center">
            <img src={AccessSystem} alt="asdas" onClick={onSignout} />
            <span id="logo" class="d-none main_logo d-lg-block">
              Access Systems
            </span>
          </Link>
        </div>
        {/* <!-- End Logo -->  */}

        <nav class="header-nav ms-auto">
          <ul class="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                onClick={handleDropdownToggle}
              >
                <img src={Profile} alt="Profile" className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {username}
                </span>
              </Link>

              {isDropdownOpen && (
                <div className="signout-container">
                  <ul>
                  {loggedAdmin && (
                      <>
                    <li>
                      
                      <Link to={"/report"} onClick={handleDropdownToggle} className="dropdown-item d-flex align-items-center">
                        <span>Reports </span>
                      </Link>
                    </li>
                    <hr />
                    
                    <li  >
                        
                        <RegisterModal 
                          registers={register}
                          setRegister={setRegister}
                          setIsDropdownOpen={setIsDropdownOpen}
                          isDropdownOpen={isDropdownOpen}
                        />
                    
                    </li>
                    <hr />
                    <li>
                  
                          <Link to={"/service"} onClick={handleDropdownToggle} className="dropdown-item d-flex align-items-center">
                          <span> Service</span>
                        </Link>
                      
                    </li>
                    <hr />
                    </>
                    )}
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                        onClick={onSignout}
                      >
                        <i className="bi bi-box-arrow-right"></i>
                        <span onClick={onSignout}>Sign Out</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>
        {/* <!-- End Icons Navigation --> */}
      </header>
    </>
  )
}
