import axios from "axios"
import { LinkApi } from "../Utils/Resource"
const view=async(setprofile)=>{
    try{
      console.log(sessionStorage.getItem('token'));
    await axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`, // Include the access token in the Authorization header
      },
      // url:'http://127.0.0.1:8000/profile/',
      url:`${LinkApi}profile/`,
    }).then(response=>{
        // console.log(response.data[0][0])
        sessionStorage.setItem('name',response.data[0][0].name)
        sessionStorage.setItem('email',response.data[0][0].email)
        setprofile(response.data)
        
    })
  }
  catch{}

  }
  export default view;