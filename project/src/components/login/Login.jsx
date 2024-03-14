import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Button, Spinner } from 'react-bootstrap';
// import { Carousel } from 'react-responsive-carousel';
import './logincss/main.css'
import './logincss/util.css'
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import portr from './images/potr.png'
import LoadExternalScript from '../../LoadExternalScript';
import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CbLogin from '../Utils/CbLogin';
// // import useLogin from '../../useLogin';
// import { UnloadExternalScript } from '../../UnloadExternalScript';
import { LinkApi } from '../Utils/Resource';

function Login(){
  const [isLoading, setIsLoading] = useState(false);
  const[email,setemail]=useState('')
  const[password,setpassword]=useState('')
  const[emailchange,setemailchange]=useState('')
  const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[btalert,setbtalert]=useState('')
  const[altmsg,setaltmsg]=useState('')
  const navigate=useNavigate()
  useEffect(()=>{
  LoadExternalScript(['loginvendor/jquery/jquery-3.2.1.min.js','loginjs/main.js']);
  // return()=>{UnloadExternalScript(['loginvendor/jquery/jquery-3.2.1.min.js','loginjs/main.js']);}
  },[])
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    
  }
  const passwordreset=async()=>{
    setIsLoading(true);
    let formField = new FormData()
    formField.append('email',emailchange)
    await axios({
      method: 'post',
      // url:'http://127.0.0.1:8000/send-reset-password-email/',
      url:`${LinkApi}send-reset-password-email/`,
      data: formField
    }).then(response=>{
      setIsLoading(false)
      if(response.data.errors)
      {
        setbtalert('error')
        setaltmsg('Email not found!!')
        setTimeout(() => {
          handleClose();
          setbtalert('')
          setaltmsg('')
        }, 2000);
      }
      else{
        // alert(response.data.msg)
        setbtalert('success')
        setaltmsg('Password Reset link send. Please check your Email')
        setTimeout(() => {
          handleClose();
          setaltmsg('')
          setbtalert('')
        }, 2000);
        }
    })
  }
  return (  
	<>
	 {/* <link rel='stylesheet'type='text/css' href='../../../logincss/util.css'></link>  */}
	{/* <link rel='stylesheet'type='text/css' href='../../../logincss/main.css'></link> */}
   <div className='login'>
    <div className="limiter">
		<div className="container-login100">
			
			<div className="card wrap-login100">
			{/* <div className="login100-form-title">
						Member Login
						</div> */}
				<div className="login100-pic position-relative">
        {/* <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showArrows={false}  showIndicators={false} showStatus={false} >
                
                    <img src={portr} />
      
                    <img src={portr}   />
                    
                    <img src={portr}  />
        </Carousel> */}
		<img  src={portr} alt='logo'/>
				</div>
         
        

				<form className="login100-form validate-form" onSubmit={handleSubmit}>
					<span className="login100-form-title">
						Login
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="text" name="email" placeholder="Email" onChange={(e) => setemail(e.target.value)}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="password" name="password" placeholder="Password"onChange={(e) => setpassword(e.target.value)}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div className="container-login100-form-btn">
						{/* <button className="login100-form-btn" onClick={()=>{}}>
							Login
						</button> */}
            <button className="btn btn-primary" onClick={()=>CbLogin(navigate,email,password)}>
							Login
						</button>
					</div>

					<div className="text-center p-t-12">
						<span className="txt1">
							Forgot
						</span>
						<a className="ms-1 txt2" onClick={handleShow} style={{cursor:'pointer'}}>
							Password?
						</a>
			
					</div>
				</form>
			</div>
		</div>
		</div>
	</div>    
	<Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-2'>
			  <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(e) => {setemailchange(e.target.value);}}
              />
            </Form.Group>
            <div className={`${btalert!==''?`${btalert==='success'?'alert alert-success':'alert alert-danger'}`:'visible-false'}`} role="alert">
                 {altmsg}
            </div>
          </Form>
		  </Modal.Body>
        <Modal.Footer>
            
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  onClick={()=>{passwordreset()}} className='btn btn-primary' variant='primary' disabled={isLoading}>
          {isLoading ?  <Spinner size='sm'/>:null}
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
}
export default Login;

