import React from 'react'
import axios from 'axios';
import AuthHeader from './AuthHeader';
import { useNavigate, useState } from 'react-router-dom';


const API_URL ="http://192.168.1.71:2000/officeLunch/employees";
class authservice {

    
    logindata(username,password){



        return axios.post(API_URL + "/login",{
            username,
            password
        })
        .then(response=>{
        
            console.log(response.data);
            localStorage.setItem("user",response.data);
            localStorage.setItem("username",username);
        console(response.data)
           if(response.data !== null || response.data !== 'Username is invalid'){
            return response.data
           } 
          
        }).catch(error=>{
            // alert('Failed to Login In');
            console.log(error);
        });
       
        }
        
        //function for register new account
        signupdata(username,email,password,role){
            return axios.post(API_URL + "/register",{
                username,
                email,
                password,
                role
            },{
                
            } )
            .then(response=>{
                console.log(response.data)
                alert('Your registration was successfully submitted!');
                return JSON.stringify(response.data);

            }).catch(error=>{
                alert('Failed to Register!');
                console.log(error);
            });
        }
    
        logout(){
            localStorage.clear();
        }
    
             ///post food prefernce
    
        postdata(username,foodPref){
                      
            return axios.post(API_URL +"/enroll",{
                username,
                foodPref,
            },{headers: {
            Authorization: 'Bearer '+ AuthHeader()
            
                
            }
    
            })
            .then(response=>{
                console.log(response.data);
                // localStorage.setItem("user",response.data);
                return JSON.stringify(response.data)
              
                
            }).catch(error=>{
                console.log(error);
            });
            }

            //get veg noveg count
            getdata () {
                           
           return axios.get(API_URL + "/getall")
           .then(response=>{
            console.log(response.data)
             return response
            
           }).catch(error=>{
            console.log(error)
            return error
           })
        }

        getsinglereport(startDateString,token ){
           const response= axios.get(
            API_URL + "/single",
            {
              date: startDateString,
            },
            {
              headers: {
                Authorization: "Bearer " + token
              }
            }
          );
          console.log(response);
        };
           
             
    

}

export default new authservice();
