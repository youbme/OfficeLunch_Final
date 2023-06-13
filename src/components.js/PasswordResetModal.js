import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import SignupSubmitModal from "./SignupSubmitModal";
import PasswordResetSubmitModal from "./PasswordResetSubmitModal";
//api url endpoint
const API = process.env.REACT_APP_API_URL;

export default function PasswordResetModal({
  pwReset,
  setpwReset,
  setIsDropdownOpen,
  isDropdownOpen,
}) {
  const [form, setform] = useState([]);

  const [userpass, setuserpass] = useState({
    oldpassword: undefined,
    password: undefined,
    confirmpassword: undefined,
  });

  //usestate for form
  const { oldpassword, password, confirmpassword } = userpass;

  const[passwordmodal,setpasswordmodal] = useState(false);

  const[open,setOpen] = useState(false);
  const initModal = () => {
    reset();
    return setpwReset(!pwReset);
  };

  //usestatefor error input in forms
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

  const onSubmit = async () => {
    // e.preventDefault()
  

    //  const result = authservice.signupdata(username,email,password,role);
 //  const result = authservice.signupdata(username,email,password,role);
 const token = localStorage.getItem("user");
    axios
      .post(
        API + "/changePass",
        {
          
          oldPass: watch("oldpassword"),
          newPass: watch("password"),
          confirmPass: watch("confirmpassword"),
          
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      
      )
      .then((response) => {
       
        setpasswordmodal(true);
        
      console.log(response)
      })
      .catch((error) => {
        setpasswordmodal(false);
        
        console.log(error);
      });
      setTimeout(()=>{
        setOpen(true)
      },2000)
        
reset();

// setTimeout(()=>{
//   setIsDropdownOpen(!isDropdownOpen);
// },3000);

    };


  return (
    <>
    <PasswordResetSubmitModal passwordmodal={passwordmodal} open={open} setOpen={setOpen}/>
      <span onClick={() => initModal()}>Password Reset</span>
      <Modal show={pwReset}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>PasswordReset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />

          <form onSubmit={handleSubmit(onSubmit)}>
            <br />
            <div class="one-frm">
              <input
                type="password"
                className="form-control"
                name="oldpassword"
                placeholder="Old Password"
                defaultValue={oldpassword}
                {...register("oldpassword", {
                  required: "Old Password cannot be empty",
                })}
              />
              {errors.email && (
                <span style={{ color: "red" }}>
                  {errors.oldpassword.message}
                </span>
              )}
            </div>
            <br />
            <div className="one-frm">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                defaultValue={password}
                // autoComplete="new-password" // tocompelsyoutowrite new-password

                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
            </div>
            <br />
            <div class="one-frm">
              <input
                type="password"
                className="form-control"
                name="confirmpassword"
                placeholder="Confirm Password"
                defaultValue={confirmpassword}
                {...register("confirmpassword", {
                  required: "Confirm Password cannot be empty",
                  validate: confirmpasswordValidation,
                })}
              />
              {errors.confirmpassword && (
                <span style={{ color: "red" }}>
                  {errors.confirmpassword.message}
                </span>
              )}
            </div>
                <br/>
            <button type="submit" class="btn btn-primary">
              {/* {isLoading ? (
                <span class="spinner-border" role="status"></span>
              ) : (
                `Sign Up`
              )}
               */}
              Confirm
            </button>
          </form>

          {/* <!-- //form --> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
