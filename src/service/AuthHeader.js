export default function AuthHeader() {
 
//gettting Storage data
const token = localStorage.getItem("user");
// const usern = localStorage.getItem("username");
//   console.log(user);

  if (token) {
    return {
     
        Authorization: "Bearer " + token,
      
    };
  } else {
    return {};
  }
}
