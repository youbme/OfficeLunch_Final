import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export default function PasswordReset() {

    const navigate = useNavigate();
//usestatefor form
const[userpass, setuserpass]= useState({
    username:undefined,
    password:undefined,
    confirmPass:undefined
}) 

const {username, password, confirmPass} = useState();
const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

   //password validation function
   const confirmpasswordValidation = (value) => {
    if (value !== watch("password")) {
      return "Passwords do not match";
    }
    return true;
  };

    //gettting Storage data
  
    const usern = localStorage.getItem("username");
  const onSubmit=(e)=>{
    // e.preventDefault();
    axios.post(API +"/pwReset",{
        username:usern,
        password:watch("password"),
        confirmPass:watch("confirmPass")
    }).then((response)=>{
        console.log(response)
        localStorage.clear();
        navigate("/login",{replace:true})
    }).catch((error)=>{
        console.log(error)
    })
    
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
                  
                  <h1>Password Reset</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="one-frm">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />
                      {errors.password && (
                        <span style={{ color: 'red' }}>{errors.password.message}</span>
                      )}
                    </div>
                    <div class="one-frm">
                      <input
                        type="password"
                        name="confirmPass"
                        placeholder="Confirm Password"
                        {...register("confirmPass", {
                          required: "Confirm Password is required",
                          validate: confirmpasswordValidation,
                        })}
                      />
                      {errors.confirmPass && (
                        <span style={{ color: 'red' }}>{errors.confirmPass.message}</span>
                      )}
                    </div>

                    <button type="submit" class="btn btn-style mt-3">
                      Login
                    </button>
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
