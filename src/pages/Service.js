import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Profile from "../img/profile-img.jpg";
import AccessSystem from "../img/Accesssystem.png";
import authservice from "../service/authservice";
import axios from "axios";

import "../css/Style2.css";
import "../vendor/quill/quill.snow.css";
import "../vendor/bootstrap/css/bootstrap.min.css";
import "../vendor/bootstrap-icons/bootstrap-icons.css";
import "../vendor/boxicons/css/boxicons.min.css";

// import '../vendor/quill/quill.bubble.css'
// import '../vendor/remixicon/remixicon.css'
// import '../vendor/simple-datatables/style.css'

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Gp from "../js/main";

const API = "http://192.168.1.71:2000/officeLunch/employees";
export default function Service() {
  //usestate for all users food preference
  const [employeespref, setEmployeepref] = useState([]);

  //usestate for counting
  const [food, setfood] = useState([]);

  const [selectedpref, setSelectedpref] = useState(false);
  //radiobutton usestate
  const [fooddata, setfooddata] = useState("");

  //errorforunableto submit
  const [submitfoodpref, setsubmitfoodpref] = useState(false);

  //gettting Storage data
  const token = localStorage.getItem("user");
  const usern = localStorage.getItem("username");

  //usestate for signup button dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log(isDropdownOpen);
  };

  //for submit button modal
  const [foodsubmmited, setFoodsubmmited] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [foodCount, setFoodCount] = useState({
    veg: 0,
    non_veg: 0,
    not_responded: 0,
    not_required: 0,
  });
  //Signout function

  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
    Gp();
    if (localStorage.getItem("user") !== null) {
      navigate("/service");
      // window.location.reload();
    }
  }, []);

  //load product
  const loadProducts = async () => {
    const { data: result } = await axios.get(
      API +"/getall",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // setFoodCount(prev => {
    //   ...prev,
    //   "veg" : food.find(el => el.food_pref==='Veg')?.count || 0
    // }))
    result.sort((a, b) => {
      if (a.food_pref < b.food_pref) {
        return -1;
      }
      if (a.food_pref > b.food_pref) {
        return 1;
      }
      return 0;
    });
    setfood(result);
    console.log(food);

    const { data: employeefood } = await axios.get(
      API +"/getallUsers"
    );
    employeefood.sort((a, b) => {
      if (a.food_pref < b.food_pref) {
        return -1;
      }
      if (a.food_pref > b.food_pref) {
        return 1;
      }
      return 0;
    });
    setEmployeepref(employeefood);
    // console.log(employeefood)

    // checking if food prefernce is already required
    employeespref.forEach((data, index) => {
      console.log(data);
      if (data.username === usern) {
        console.log(data);
        setsubmitfoodpref(true);
      }
    });
  };

  const radioOptionChange = (e) => {
    setfooddata(e.target.value);
    console.log(fooddata);
  };

  //Submmit function for food preference
  const onSubmit = async (e) => {
    e.preventDefault();

    //checking if radio button is empty to send error message
    if (fooddata === "") {
      setSelectedpref(true);
      setShow(true);
      return;
    } else {
      setSelectedpref(false);
    }
    console.log(fooddata);
    // authservice.postdata( fooddata, token);
    await axios
      .post(
        API+"/enroll",
        {
          foodPref: fooddata,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);

        setFoodsubmmited(true);
        setShow(true);
        console.log(response);
        return JSON.stringify(response.data);
      })
      .catch((error) => {
        setFoodsubmmited(false);
        setShow(true);
        console.log(error);
      });
    //checking if food prefernce is already selected
    employeespref.forEach((data) => {
      if (data.username === usern) {
        setsubmitfoodpref(true);
      }
    });
  };

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
                  {usern}
                </span>
              </Link>

              {isDropdownOpen && (
                <div className="signout-container">
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
                </div>
              )}
            </li>
          </ul>
        </nav>
        {/* <!-- End Icons Navigation --> */}
      </header>

      <div id="main" class="main">
        <div class="container">
          <div class="row">
            {/* 
    <!-- Left side columns --> */}
            <div class="col-lg-12">
              <div class="row">
                {/* <!-- Sales Card --> */}
                {/* <div class="col-xxl-4 col-md-6">
                  <div class="card text-dark  bg-offwhite info-card sales-card">
                    <div class="card-body">
                      <h3 class="card-title">
                        Food <span>| Today</span>
                      </h3>

                      <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="bi bi-cart"></i>
                        </div>
                        <div class="ps-3">
                          <h4>Chicken Burger</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <!-- End Sales Card -->

        <!-- Revenue Card --> */}
                {/* <div class="col-xxl-4 col-md-6">
                  <div class="card text-dark  bg-offwhite info-card revenue-card">
                    <div class="card-body">
                      <h5 class="card-title">
                        Food <span>| Tomorrow</span>
                      </h5>

                      <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="bi bi-currency-dollar"></i>
                        </div>
                        <div class="ps-3">
                          <h4>Chicken Curry + Rice</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <!-- End Revenue Card -->

        <!-- Customers Card --> */}
                {/* <div class="col-xxl-4 col-xl-12">
                  <div class="card text-dark  bg-offwhite info-card customers-card">
                    <div class="card-body">
                      <h5 class="card-title">
                        Food <span>| Next Day</span>
                      </h5>

                      <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="bi bi-people"></i>
                        </div>
                        <div class="ps-3">
                          <h4>Chicken Chilly + Fried Rice</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* <!-- End Customers Card -->

        <!-- Reports --> */}
                <div class="col-6 ">
                  <div class="card text-dark  bg-offwhite   ">
                    <div class="card-body ">
                      <h1 class="card-title">Preference</h1>
                      <hr />
                      <form onSubmit={(e) => onSubmit(e)}>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value={"Veg"}
                            checked={fooddata === "Veg"}
                            onChange={radioOptionChange}
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            Veg
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            value={"Non-Veg"}
                            checked={fooddata === "Non-Veg"}
                            onChange={radioOptionChange}
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Non-Veg
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault3"
                            value={"Not-Required"}
                            checked={fooddata === "Not-Required"}
                            onChange={radioOptionChange}
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault3"
                          >
                            Not-Required
                          </label>
                        </div>
                        
                        {/* <div class="flex-container"> */}

                        <p >
                          {submitfoodpref
                            ? <span className="food-warning ">"You have already Submmited your prefernce for today. Comeback again tomorrow"</span>
                            : <br/>}
                        </p>

                        {/* </div> */}

                        <button type="submit" class="btn btn-secondary">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card text-dark  bg-offwhite">
                    <div class="card-body">
                      <h1 class="card-title">Today</h1>
                      <hr />
                      <div class="card-body">
                        <div className="row">
                          <div className="col-6">
                            {" "}
                            <p>
                              Non-Veg Count:{" "}
                              <span>{food[0] ? food[0].count : 0}</span>
                            </p>
                            <p>
                              Veg Count:{" "}
                              <span>{food[3] ? food[3].count : 0}</span>
                            </p>
                            <p>
                              Total :{" "}
                              <span>
                                {""}

                                {parseInt(food[0] ? food[0].count : 0) +
                                  parseInt(food[3] ? food[3].count : 0)}
                               
                              </span>
                            </p>
                          </div>
                          <div className="col-6">
                            <p>
                              Not-Required Count:
                              <span> {food[1] ? food[1].count : 0}</span>
                            </p>
                            <p>
                              Not-Responded Count:
                              <span> {food[2] ? food[2].count : 0}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="card text-dark  bg-offwhite recent-sales overflow-auto">
                    <div class="card-body">
                      <h5 class="card-title employeepreference">
                        Employee's Food Preferences <span>| Today</span>
                      </h5>
                      <hr />
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>

                            <th scope="col">Preference</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employeespref.map((pref, index) => (
                            <tr key={index}>
                              <td>{pref.username}</td>
                              <td>
                                {" "}
                                <span
                                  style={{
                                    backgroundColor: getColorCode(
                                      pref.food_pref
                                    ),
                                    borderRadius: 6,
                                    padding: 6,
                                    fontWeight: "bold",
                                  }}
                                >
                                  {pref.food_pref}{" "}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------Modal-------------------- */}
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Food Preference
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}

          {foodsubmmited
            ? "Succesfully Submitted"
            : selectedpref
            ? "You have not Selected your preference"
            : submitfoodpref
            ? "You have already submmitted your preference for today"
            : "Failed to Submit."}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>OK</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

//functionforEmployeetableRowColor
function getColorCode(foodPref) {
  switch (foodPref) {
    case "Veg":
      return "#00FF00"; // Green color code for Veg
    case "Non-Veg":
      return "#FF0000"; // Red color code for Non-Veg
    case "Not-Required":
      return "#808080"; // Gray color code for No-Required
    default:
      return "#FFFFFF"; // White color code for other cases
  }
}
