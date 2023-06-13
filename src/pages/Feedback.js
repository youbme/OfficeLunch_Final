import React, { useState } from "react";
import "../css/Style3.css";
import axios from "axios";
import { useEffect } from "react";
import FeedbackModal from "../components.js/FeedbackModal";

//Apiurl
const API = process.env.REACT_APP_API_URL;

export default function Feedback() {
  //usestate to show feedback
  const [feedback, setfeedback] = useState([]);

  //usestateto show selected feed to modal
  const[selectedfeed,setselectedfeed] = useState({})

  //usestate to openmodal
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadfeedback();
  }, []);
  //gettting Storage data
  const token = localStorage.getItem("user");
  const usern = localStorage.getItem("username");

  const loadfeedback = () => {
    axios
      .get(API + "/feedbackToAdmin", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setfeedback(response.data);
        console.log(feedback);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const ondelete=()=>{
  //   axios.delet
  // }

  return (
    <>
      <div className="main">
        <div className="container">
          <h1 className="text-center">Feedback's Report</h1>
          <div className="col-12">
            <div className="card text-dark  bg-offwhite info-card  ">
              <div class="card-body ">
                <h1 class="card-title">Report</h1>
                <div class="card-body">
                  <div className="row">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Number</th>
                          {/* <th>Message</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {feedback.map((feed, index) => (
                         
                            <>
                            <tr key={index} >
                               
                              <td onClick={()=>{ setselectedfeed(feed); setOpen(true)}} >{feed.email}</td>
                              <td  onClick={()=>{ setselectedfeed(feed); setOpen(true)}}>{feed.contactDetail}</td>
                              
                              {/* <td>{feed.content}</td> */}
                              <div> delete</div>
                              
                            </tr>
                            </>
                          
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeedbackModal open={open} setOpen={setOpen} selectedfeed={selectedfeed} />
    </>
  );
}
