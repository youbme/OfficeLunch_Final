import React from "react";
import "../css/Style1.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const API = process.env.REACT_APP_API_URL;

export default function Login() {

const navigate = useNavigate();

const [loggedin, setLoggedin] = useState(false)
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

  //for login authorization
  const [isLoading, setLoading] = useState(false);

  const [userpass, setuserpass] = useState({
    username: undefined,

    password: undefined,
  });
  useEffect(() => {
    if(localStorage.getItem("user") !== null){
      
    
      navigate("/service")
      // window.location.reload();
      }
  });
  const { username, password } = userpass;

  const onInputChange = (e) => {
    setuserpass({ ...userpass, [e.target.name]: e.target.value });
    // console.log(userpass);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(API)

    setLoading(true);
    axios
      .post( API+"/login", {
        username,
        password,
      })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          localStorage.setItem("user", response.data);
          localStorage.setItem("username", username);
          setLoading(false)
          setLoggedin(true)
          setShow(true)
        }
      })
      .catch((error) => {
      
        console.error(error);
        setLoading(false)
        setLoggedin(false)
        setShow(true)
      });
      console.log("hello");

       
      // if(localStorage.getItem("user") !== null){
      
      //       // navigate("/service")
      //   // window.location.reload();
      //   } 
        
  };

  
  return (
    <>
      <section class="w3l-workinghny-form">
        {/* <!-- /form --> */}
        <div class="workinghny-form-grid">
          <div class="wrapper">
            <div class="workinghny-block-grid">
              <div class="form-right-inf">
                <div class="login-form-content">
                  
                  <h1>Login</h1>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div class="one-frm">
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => onInputChange(e)}
                        required
                        autofocus
                      />
                    </div>
                    <div class="one-frm">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => onInputChange(e)}
                        required
                      />
                    </div>

                    <button type="submit" class="btn btn-style mt-3">
                      { isLoading ?  <span class="spinner-border" role="status" ></span> : `Login`}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- //form --> */}
      </section>
      

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}

          {loggedin ? "Logged In Successfully" :   "Failed to LogIn"  }

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>OK</Button>
        </Modal.Footer>
      </Modal>
    
    
    </>
  );
}
