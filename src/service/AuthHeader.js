 
 export default function AuthHeader(){

    const user = JSON.stringify( localStorage.getItem('user'));
    // const token = user.token;
    console.log(user)
    // console.log(user.token)
    if(user ){
        return{
            Authorization: 'Bearer ' +user,
            // Cookie: 'JSESSIONID='+user
        };
    } else {
  return {
    
  };
}

 }

