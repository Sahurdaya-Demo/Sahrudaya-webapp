import axios from "axios"
import { useState,useEffect } from "react"
import Register from "./register/register"
import { Link, useParams } from "react-router-dom"
import Error from "./error"
import { LinkApi } from "./Resource"
function Registervalid(){
    const [Valid,setValid]=useState(false)
    const {secure}=useParams()
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
            Valid?(<Register secure={secure}/>):(<Error/>)
        }
        </>
    )
}
export default Registervalid