import React from "react";
import Calendar from "react-calendar";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import "../css/Style3.css";


import DropDownCalender from "../components.js/DropDownCalender";

import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function Report() {
  const [dates, setDate] = useState(new Date());


  //employeepreferncedata
  const [prefdata, setprefdata] = useState([])
  //reporttype
  const [calendartype, setCalendartype] = useState(true);

  //useStateforCalendar date
  const [startDate, setStartDate] = useState(dates);
  const [endDate, setEndDate] = useState(dates);
  const handleStartDateChange = (dates) => {
    setStartDate(dates);
  };

  const handleEndDateChange = (dates) => {
    setEndDate(dates);
  };

  //gettting Storage data
  const token = localStorage.getItem("user");
  //function to change dates format
  const formatDate = (dates) => {
    const year = dates.getFullYear();
    const month = String(dates.getMonth() + 1).padStart(2, "0");
    const day = String(dates.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const startDateString = formattedStartDate.toString();
    const endDateString = formattedEndDate.toString();
    console.log(formattedStartDate);
    console.log(token)
    // const result = await authservice.getsinglereport(startDateString,token);
    
    try {
      const result = await axios.post(
        API+"/single",
        {
          date: startDateString,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setprefdata(result.data)
      console.log(result);
      console.log(prefdata)
    } catch (error) {
      console.error(error);
    }
     
  };

  const onSubmitRange = async () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const startDateString = formattedStartDate.toString();
    const endDateString = formattedEndDate.toString();
    console.log(formattedStartDate);
    console.log(token)
    // const result = await authservice.getsinglereport(startDateString,token);
    
    try {
      const result = await axios.post(
        API+"/range",
        {
          date1: startDateString,
          date2: endDateString
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setprefdata(result.data)
      console.log(result);
      console.log(prefdata)
    } catch (error) {
      console.error(error);
    }
     
  };
  

  return (
    <>
      <br />
      <br />
      <br />

      <div id="main" class="main">
        <div class="container">
          <div id="reportfirstrow" class="row">
          
            <h1 className="text-center">Food's Report</h1>
            <div className="col-6">
              <div className="card text-dark  bg-offwhite info-card  ">
                <div class="card-body ">
                  <h1 class="card-title">Preference</h1>
                  <div class="card-body">
                    <div className="row">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Preference</th>

                            <th scope="col">Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {prefdata.map((pref,index)=>(
                            <tr key={index}>
                            <td>{pref.food_pref}</td>
                            <td>{pref.count}</td>
                          </tr>
                          ))}
                          
                         
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className=" card text-dark  bg-offwhite ">
                <div class="card-body ">
                  <h1 class="card-title">Preference</h1>
                  <div>
                 
                  <DropDownCalender setCalendartype={setCalendartype} />
                  
                  </div>
                  <div class="card-body">
                   

                    <br />
                    {calendartype ? (
                      <div>
                        <div id="dateheaderdiv">
                        <p id="dateheader">Select a Specific Date:</p>
                        </div>
                        <label>Select Date: </label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                        {startDate && endDate && (
                          <p>
                            Selected Date {startDate.toDateString()} -{" "}
                            {endDate.toDateString()}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div >
                        <div id="dateheaderdiv">
                        <p id="dateheader">Select a Date Range</p>
                        </div>
                        <div id="daterange"  style={{display:"flex"}}>
                        <div >
                          <label>Start Date: </label>
                          <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                           
                          />
                        </div>
                        <div>
                          <label>End Date: </label>
                          <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                          />
                        </div>
                        </div>
                        {startDate && endDate && (
                          <p>
                            Selected range: {startDate.toDateString()} -{" "}
                            {endDate.toDateString()}
                          </p>
                        )}
                      </div>
                    )}
                    {calendartype ? <button onClick={onSubmit}> Generate Report </button> : <button onClick={onSubmitRange}> Generate Report </button>}
                    
                  </div>
                </div>
              </div>
            </div>
         
          </div>
        </div>
      </div>
    </>
  );
}
