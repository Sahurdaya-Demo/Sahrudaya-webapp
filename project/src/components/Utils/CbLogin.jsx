// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom"
import axios from "axios";
import { LinkApi } from "./Resource";
const CbLogin=async(navigate,email,password)=>{
    let token;
    let token1;
    if(email!==''&&email.includes('@')){
      if(password!==''){
          
      let formField = new FormData()
      formField.append('email',email)
      formField.append('password',password)
     
      try{
        await axios({
          method: 'post',
          // url:'http://127.0.0.1:8000/login/',
          url:`${LinkApi}login/`,
          data: formField
        }).then(response=>{
          // token=response.data.token.access;
          try{
          token=response.data.token.access;
          // token1=response.data.token;
          // console.log(token)
          sessionStorage.setItem('token',JSON.stringify(token))
          // sessionStorage.setItem('token','token')
          navigate(`/${response.data.type}`,{state:{token}})
          }
          catch{
          alert('Login Failed !, Please Check Your Username Or Password !')
          }
          
          })
       }
      catch{
         alert('Server Down!! Contact Admin')
      }
      }
      } 
    
}
export default CbLogin