import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import "../css/Signup.css";
import axios from "axios";
import SignupSubmitModal from "./SignupSubmitModal";

const API = process.env.REACT_APP_API_URL;

export default function RegisterModal({ registers, setRegister,setIsDropdownOpen, isDropdownOpen }) {
  //popupaftersubmission
  const [open, setOpen] = useState(false);
  //popupconsolesubmit
  const [signupsubmit, setsignupsubmit] = useState(false);

  const initModal = () => {
    reset();
    return setRegister(false);
  };
  const [userpass, setuserpass] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    confirmpassword: undefined,
  });

  //usestate for form
  const { username, email, password, confirmpassword } = userpass;

  const [isLoading, setLoading] = useState(false);
  const onInputChange = (e) => {
    setuserpass({ ...userpass, [e.target.name]: e.target.value });
    console.log(userpass);
  };

  //use state for role
  const [role, setRole] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const radioOptionChange = (e) => {
    const selectedrole = parseInt(e.target.value);
    setRole(selectedrole);
    setErrorMessage("");
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

  //form signup button function
  const onSubmit = async () => {
    // e.preventDefault()
    setLoading(true);
    //checking if role is selected
    if (!role) {
      setErrorMessage("Please select a role.");
      setLoading(false);
    }

    //  const result = authservice.signupdata(username,email,password,role);
    const token = localStorage.getItem("user");
    axios
      .post(
        API + "/register",
        {
          username: watch("username"),
          email: watch("email"),
          password: watch("password"),
          confirmPass: watch("confirmpassword"),
          roles: [{ id: role }],
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        // alert("Your registration was successfully submitted!");

        if (response.data === "Register success") {
          setsignupsubmit(true);
        } else {
          setsignupsubmit(false);
        }
        return JSON.stringify(response.data);
      })
      .catch((error) => {
        // alert("Failed to Register!");
        // setsignupsubmit(false);
        console.log(error);
      });
    // console.log(result)

    setLoading(false);
    setTimeout(() => {
      setOpen(true);
    }, 1000);
    // setOpen(true);
    setsignupsubmit(undefined);
    setRegister(false);
    resetForm();
    // setIsDropdownOpen(!isDropdownOpen);

  };
  const resetForm = () => {
    setuserpass({
      username: undefined,
      email: undefined,
      password: undefined,
      confirmpassword: undefined
    });
    setRole(undefined);
    reset(); // Clear the form fields using react-hook-form reset function
    setTimeout(()=>{
      setIsDropdownOpen(!isDropdownOpen);
    },3000)
    
  };

  const settextfield = () => {
    setRegister(!registers);


  };

  return (
    <>
      <SignupSubmitModal
        open={open}
        setOpen={setOpen}
        signupsubmit={signupsubmit}
      />

      <span onClick={() => settextfield()}>Register</span>

      <Modal show={registers}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Sign Up Accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-group">
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                defaultValue={username}
                onChange={(e) => onInputChange(e)}
                autoFocus
                {...register("username", {
                  required: "Username cannot be empty",
                })}
                
              />
              {errors.username && (
  <span style={{ color: 'red' }}>{errors.username.message}</span>
)}
            </div>
            <br />
            <div class="one-frm">
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Email"
                defaultValue={email}
                onChange={(e) => onInputChange(e)}
                {...register("email", {
                  required: "Email cannot be empty",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
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
                onChange={(e) => onInputChange(e)}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
            </div>
            <br />
            <div class="one-frm">
              <input
                type="password"
                className="form-control"
                name="confirmpassword"
                placeholder="Confirm Password"
                defaultValue={confirmpassword}
                onChange={(e) => onInputChange(e)}
                {...register("confirmpassword", {
                  required: "Confirm Password cannot be empty",
                  validate: confirmpasswordValidation,
                })}
              />
              {errors.confirmpassword && (
                <span style={{ color: 'red' }}>{errors.confirmpassword.message}</span>
              )}
            </div>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadio"
                id="flexRadio1"
                value={1}
                checked={role === 1}
                onChange={radioOptionChange}
              />
              <label class="form-check-label" for="flexRadio1">
                Admin
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadio"
                id="flexRadio2"
                value={2}
                checked={role === 2}
                onChange={radioOptionChange}
              />

              <label class="form-check-label" for="flexRadio2">
                User
              </label>
            </div>
            <br />

            {errorMessage && (
              <span style={{ color: "red" }}>{errorMessage}</span>
            )}
            <br />
            <button type="submit" class="btn btn-primary">
              {isLoading ? (
                <span class="spinner-border" role="status"></span>
              ) : (
                `Sign Up`
              )}
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
