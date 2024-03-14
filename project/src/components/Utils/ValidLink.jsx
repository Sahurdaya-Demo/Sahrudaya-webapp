import { useState } from "react"
import Error from "./error"
import Userpassreset from "./Userpassreset"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { LinkApi } from "./Resource"
function ValidLink(){
const [Valid,setValid]=useState(false)
const {id,token,secure}=useParams()
useEffect(()=>{ retrieve()},[])

const retrieve=async()=>{
    await axios({
        method:'post',
        // url: `http://127.0.0.1:8000/validget`,
        url: `${LinkApi}validget`,
        data:{'secure_str':secure},
        headers: {
          'Content-type': 'application/json',
        }
      }).then(response=>{
        if(response.data.errors){
          setValid(false)
        }
        else{
          setValid(true)
        }
      })
}       
return(
    <>
    {
        Valid?(<Userpassreset id={id} token={token} secure={secure}/>):(<Error/>)
    }
    </>
)

}
export default ValidLink