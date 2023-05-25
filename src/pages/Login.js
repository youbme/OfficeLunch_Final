import React from 'react'
import '../css/Style1.css'
import { useState } from 'react';
import authservice from '../service/authService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const [userpass, setuserpass] = useState({
        username:undefined,
        
        password:undefined,
      
    })

    const {username,password}= userpass;

   
    const onInputChange= (e)=>{
    setuserpass({...userpass,[e.target.name]:e.target.value})
     console.log(userpass)
    }


    const onSubmit = async (e)=>{
        e.preventDefault();
        
    //    const userpass = auth_service.logindata();
    //    authservice.signupdata(userpass.username,userpass.email,userpass.password);
        // await axios.post("http://192.168.1.66:2000/officeLunch/employees/register",{
        //     username,
        //     email,
        //     password})
        //     .then(response=>{
        //         alert("Succesfully Registered")
        //         console.log(response.data)
        //     })
        //     .catch(error=>{
        //         alert("Failed to Register")
        //         console.log(error)
        //     })

        navigate("/service");
		
    }

    

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
                            <form onSubmit={(e)=>onSubmit(e)} method="post">
                                <div class="one-frm">
                                    <input type="email" name="username" placeholder="Email"
                                    value={username} onChange={(e)=>onInputChange(e)} required autofocus/>
                                </div>
                                <div class="one-frm">
                                    <input type="password" name="password" placeholder="Password"
                                    value={password} onChange={(e)=>onInputChange(e)} required/>
                                </div>
                                <label class="check-remaind">
                                    <input type="checkbox"/>
                                    <span class="checkmark"></span>
                                    <p class="remember">Remember Me</p>

                                </label>
                                <button type='submit' class="btn btn-style mt-3">Login </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- //form --> */}
    </section>
    </>
  )
}
