import React from 'react'
import axios from 'axios';
import AuthHeader from './AuthHeader';
import { useNavigate } from 'react-router-dom';


const API_URL ="http://192.168.1.66:2000/officeLunch/employees";
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
        
           if(response.data != null){
            return JSON.stringify(response.data)
           }

          
        }).catch(error=>{
            alert('Failed to Login In');
            console.log(error);
        });
       
        }
    
        signupdata(username,email,password){
            return axios.post(API_URL + "/register",{
                username,
                email,
                password
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
            return axios.post(API_URL + "/logout")
            .then(response=>{
                console.log(response.data);
                return JSON.stringify(response.data);
            }).catch(error=>{
                console.log(error);
            });
        }
    
             
    
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
    

}

export default new authservice();
