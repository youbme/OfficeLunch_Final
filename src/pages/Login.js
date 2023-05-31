import React from 'react'
import '../css/Style1.css'
import { useState } from 'react';
import authService from '../service/authservice';
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
      const user= authService.logindata(userpass.username,userpass.password);
        
      if(user){
        alert('Logged In Successfully!');
        navigate("/service");
      } else {
        alert('Failed to Login!');
      }

         
		
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
                                    <input type="text" name="username" placeholder="Email"
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
