import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import AccessSystem from '../img/Accesssystem.png'
import '../css/Style2.css'
import '../vendor/quill/quill.snow.css'
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/bootstrap-icons/bootstrap-icons.css'
import '../vendor/boxicons/css/boxicons.min.css'

// import '../vendor/quill/quill.bubble.css'
// import '../vendor/remixicon/remixicon.css'
// import '../vendor/simple-datatables/style.css'

import Gp from '../js/main';



export default function Service() {

    useEffect(()=>{
            
        Gp();
  
      
      },[])

    const [fooddata, setfooddata]= useState('');

const radioOptionChange = (e) => {
    setfooddata(e.target.value);
    // console.log(fooddata)
}

 const onSubmit = async (e)=>{
    
  
    console.log(fooddata);
   const usern = localStorage.getItem("username");
   console.log(usern)
   const token = localStorage.getItem("user");
   console.log(token)
//    auth_service.postdata(usern,fooddata,token);
    // await axios.post("http://192.168.1.66:2000/officeLunch/employees/enroll",{
    //     username:usern,
    //     foodPref:fooddata
    // },{headers: {
    //     Authorization: 'Bearer '+token
    // }
    // })
    // .then(response=>{
       
    //     alert("Succesfully Submmited");
    //     console.log(response.data);
    //     // localStorage.setItem("user",response.data);
    //     return JSON.stringify(response.data)
    // }).catch(error=>{
    //     alert("Failed to submit");
    //     console.log(error);
    // });

 }
  return (
    <>
      <header id="header" class="header fixed-top d-flex align-items-center">

<div class="d-flex align-items-center justify-content-between">
  <a href="index.html" class="logo d-flex align-items-center">
    <img src={AccessSystem}  alt="asdas"/>
    <span class="d-none d-lg-block">Access Systems</span>
  </a>
</div>
{/* <!-- End Logo -->  */}


<nav class="header-nav ms-auto">
  <ul class="d-flex align-items-center">

    <li class="nav-item dropdown pe-3">

      <Link class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
        <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle"/>
        <span class="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span>
      </Link>
      {/* <!-- End Profile Iamge Icon --> */}

      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">

        <li>
          <Link class="dropdown-item d-flex align-items-center" >
            <i class="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </Link>
        </li>

      </ul>
      {/* <!-- End Profile Dropdown Items --> */}
    </li>
    {/* <!-- End Profile Nav --> */}

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
        <div class="col-xxl-4 col-md-6">
          <div class="card text-dark  bg-offwhite info-card sales-card">

            <div class="card-body">
              <h3 class="card-title">Food <span>| Today</span></h3>

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
        </div>
        {/* <!-- End Sales Card -->

        <!-- Revenue Card --> */}
        <div class="col-xxl-4 col-md-6">
          <div class="card text-dark  bg-offwhite info-card revenue-card">

            <div class="card-body">
              <h5 class="card-title">Food <span>| Tomorrow</span></h5>

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
        </div>
        {/* <!-- End Revenue Card -->

        <!-- Customers Card --> */}
        <div class="col-xxl-4 col-xl-12">

          <div class="card text-dark  bg-offwhite info-card customers-card">

            <div class="card-body">
              <h5 class="card-title">Food <span>| Next Day</span></h5>

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

        </div>
        {/* <!-- End Customers Card -->

        <!-- Reports --> */}
        <div class="col-6">
          <div class="card text-dark  bg-offwhite">

            <div class="card-body">
              <h1 class="card-title">Preference</h1>
              <hr/>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                <label class="form-check-label" for="flexRadioDefault1">
                  Veg
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                <label class="form-check-label" for="flexRadioDefault2">
                  Non-Veg
                </label>
              </div>
              <br/>
              <button class="btn btn-secondary">Submit</button>
            </div>

          </div>
        </div>
        <div class="col-6">
          <div class="card text-dark  bg-offwhite">

            <div class="card-body">
              <h1 class="card-title">Today</h1>
              <hr/>
              <div class="card-body">
                <h5>Veg Count : <span>4</span></h5>
                <h5>Non-Veg Count : <span>12</span></h5>
                <h5>Total : <span>16</span></h5>
              </div>
              </div>
              </div>
              
        </div>
       

      
        <div class="col-12">
          <div class="card text-dark  bg-offwhite recent-sales overflow-auto">

            <div class="card-body">
              <h5 class="card-title">Food Items <span>| This Week</span></h5>

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Days</th>
                    <th scope="col">Veg Items</th>
                    <th scope="col">Non-Veg Items</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monday</td>
                    <td>potato</td>
                    <td>meat</td>
                    <td><span class="badge bg-success">Approved</span></td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>potato</td>
                    <td>meat</td>
                    <td><span class="badge bg-warning">Pending</span></td>
                  </tr>
                  <tr>
                    <td>Wednesday</td>
                    <td>potato</td>
                    <td>meat</td>
                    <td><span class="badge bg-success">Approved</span></td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td>potato</td>
                    <td>meat</td>
                    <td><span class="badge bg-success">Approved</span></td>
                  </tr>
                  <tr>
                    <td>Friday</td>
                    <td>potato</td>
                    <td>meat</td>
                    <td><span class="badge bg-success">Approved</span></td>
                  </tr>
                </tbody>
              </table>

            </div>

          </div>
        </div>
       
      </div>
    </div>

  </div>
</div>

</div>
    </>
  )
}
