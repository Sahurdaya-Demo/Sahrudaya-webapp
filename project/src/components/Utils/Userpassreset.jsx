import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from "react-router-dom"
import portr from '../login/images/potr.png'
import { FaLock } from 'react-icons/fa'
import { LinkApi } from './Resource';
function Userpassreset({id,token,secure}){
    const[password,setpassword]=useState('')
    const[crpassword,setcrpassword]=useState('')
    // const { id, token,secure } = useParams()
    const Reset=async()=>{
    if(password!==''||crpassword!==''){
      if(password==crpassword){
    let formField = new FormData()
    formField.append('password',password)
    formField.append('password2',crpassword)
    await axios({
      method:'post',
      // url: `http://127.0.0.1:8000/validpost`,
      url: `${LinkApi}validpost`,
      data:{'secure_str':secure},
      headers: {
        'Content-type': 'application/json',
      }
    })
   
    await axios({
      method: 'post',
      // url: `http://127.0.0.1:8000/reset-password/${id}/${token}/`,
      url: `${LinkApi}reset-password/${id}/${token}/`,
      data: formField,
      headers: {
        'Content-type': 'application/json',
      }
    }).then(response=>{
        setcrpassword('')
        setpassword('')
       if(response.data)
       alert('Password Changed Successfully!! Return To Login Page')
       else
        alert(`Password and Confirm Password Doesn't match`)
      })
      }
      else
        alert('Password And Confirm Password Dont Match!!')
    }
    else{
      alert('Password Fields Are Empty!!')
    }

    }
    const handlesubmit=(e)=>{
        e.preventDefault();
    }
    return(
        <>
        <div className='login'>
    <div className="limiter">
		<div className="container-login100">
			
			<div className="card wrap-login100">
	<div className="login100-pic position-relative">
  <img  src={portr} alt='logo'/>
				</div>

        {/* <div className='container d-flex justify-content-center mt-5'>
        <div className='w-75'> */}
        <Form onSubmit={handlesubmit} className='p-3 mx-4'>
        <div style={{textAlign:"center"}}>
        <Form.Label className='mb-3 d-flex login100-form-title align-content-center justify-content-center'>Forgot password?</Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="input-group"> 
    <span className="input-group-text">
    <FaLock /></span>
          <Form.Control style={{ height: '50px' }}className="wrap-input" type="password" placeholder="Enter New Password" onChange={(e)=>setpassword(e.target.value)} value={password}/>
        </div>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
  <div className="input-group">
    <span className="input-group-text lock-icon"><FaLock /></span> {/* Applying lock-icon class */}
    <Form.Control style={{ height: '50px' }} className="wrap-input" type="password" placeholder="Confirm New Password" onChange={(e) => setcrpassword(e.target.value)} value={crpassword}/>
  </div>
</Form.Group>
        <Button  variant="primary" type="submit" onClick={()=>Reset()}>
          Submit
        </Button>
        </div>
      </Form>
        </div>
      </div>
      </div>
      </div>
      {/* </div>
      </div> */}
      </>
    )

}
export default Userpassreset