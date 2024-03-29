import React, { useEffect, useState ,useRef} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card, CardBody } from "reactstrap";
import axios from 'axios';
import {Spinner } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { LinkApi } from '../Utils/Resource';
function Employee() {
  // const [items, setItems] = useState([]);
  // let empdetails
  const counter = useRef(0);
  const[status,setstatus]=useState(false);
  const[loading,setloading]=useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [Records,setRecords]=useState([])
  const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[btalert,setbtalert]=useState('')
  const[altmsg,setaltmsg]=useState('')
  const[email,setemail]=useState('')
  const[today,settoday]=useState('')
  const[overall,setoverall]=useState('')
  const[yesterday,setyesterday]=useState('')
  // let json;
  useEffect(()=>{ 
  retrieve()
  },[])
  const count=async(email)=>{
    try{
      // console.log(sessionStorage.getItem('token'));
    await axios({
      method: 'post',
      data:{'email':email},
      // url:'http://127.0.0.1:8000/profile/',
      url:`${LinkApi}demo/`,
    }).then(response=>{
        settoday(response.data.today)
        setyesterday(response.data.yesterday)
        setoverall(response.data.overall)
        
    })
  }
  catch{}
}
  const retrieve=async()=>{
    
    const response= await fetch(`${LinkApi}api/`)
    const jsonData = await response.json();
    
    for(let i=0;i<Object.keys(jsonData).length;i++){
      try{
      if(jsonData[i].type==='admin')
      delete jsonData[i]
      }
      catch{}
    }
    
    // console.log(jsonData[1].is_active)
    setRecords(jsonData)
    
   } 
   const imageLoaded = () => {
     counter.current += 1;
     if (counter.current >= (Records.length-1)) {
       setloading(false);
     }
   }

 const handleClick = async() => {
  if(email!=='')
  {
  setIsLoading(true);
  let formField = new FormData()
  formField.append('email',email)
  await axios({
    method: 'post',
    // url:'http://127.0.0.1:8000/send-resgister-email/',
    url:`${LinkApi}send-resgister-email/`,
    data: formField
  }).then(response=>{
    setaltmsg('Email Send!!')
    setbtalert('success')
     setIsLoading(false)
     setTimeout(() => {
      setbtalert('')
      setaltmsg('')
      handleClose(); 
    }, 2000);
  })
  }
}
const delemp=async(idi)=>{
  if (window.confirm('Are you sure to delete this user?')){
  try{
    await axios({
      method: 'delete',
      // url:`http://127.0.0.1:8000/api/${idi}/`,
      url:`${LinkApi}api/${idi}/`,
      // data:formField,
      
    }).then(response=>{
      alert(response.data.message);
    })}
    catch{
     alert('Record not found')
    }
  }
}
const disable=async(email,status)=>{
  if (window.confirm(`Are you sure to ${status} this user?`)){
  try{
    // retrieve()
    await axios({
      method: 'post',
      data:{'email':email},
      url:`${LinkApi}disable/`,    
    }).then(response=>{
      retrieve();
    })}
    catch{
     alert('Record not found')
    }
  }
}

  return (
    <>
      {/* <link rel='stylesheet' type='text/css' href='../../../empcss/styles.css'></link> */}
      
          <div className='counsellors'>
           <div className="row-12 p-0 d-flex flex-wrap justify-content-center flex-sm-row flex-column">

            {Records.map(record=>
            <div className="card mb-3 m-3 rounded-5 " style={{maxWidth: "500px"}} key={record.id}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src="../../../loading.gif" className=" object-fit-cover" style={{height:'100%',width:'100%',display: loading ? "block" : "none"}}alt="Loading" />
                  <img src={record.image}  onLoad={imageLoaded} className="object-fit-cover" alt="..." style={{height:'100%',width:'100%',display: loading ? "none" : "block"}}/>
                </div>
                <div className="col-md-8">
                  <div className="card-body " style={{padding:"3.5px"}}>
                    <h5 className="card-title text-uppercase text-success mt-3 ms-1">{record.name}</h5>
                    <hr></hr>
                    <p className="card-text text-success ms-1">Age : <small className="text-body-secondary text-dark">{record.age}</small></p>
                    <p className="card-text text-success ms-1">Email : <small className="text-body-secondary text-dark">{record.email}</small></p>
                    <p className="card-text text-success ms-1">Phone No. : <small className="text-body-secondary text-dark">{record.phone}</small></p>
                    <p className="card-text text-success ms-1">Qualification : <small className="text-body-secondary text-dark">{record.qualification}</small></p>
                    <div className=' float-lg-end float-md-end float-sm-none mx-sm-0 mx-5 mb-2 mb-sm-0 d-flex justify-content-between'>
                    <OverlayTrigger
                      trigger="click"
                      // key={placement}
                      placement='bottom'
                      rootClose
                      overlay={
                        <Popover >
                          <Popover.Header as="h3">Today    :<strong> {today}</strong></Popover.Header>
                          <Popover.Header as="h3">Yesterday:<strong> {yesterday}</strong></Popover.Header>
                          <Popover.Header as="h3">Overall:< strong> {overall}</strong></Popover.Header>
                        </Popover>
                      }
                    >
                     <Button variant="success" className=' me-sm-2 me-0' onClick={()=>count(record.email)}><i className="bi bi-file-earmark-fill"></i></Button>
                    </OverlayTrigger>
                     <button className={`btn  ${record.is_active?'btn-warning':'btn-secondary'} me-sm-2 me-0`} onClick={()=>disable(record.email,record.is_active?'disable':'enable')} style={{color:'white'}}><i className="bi bi-person-fill-slash"></i></button>
                     <button className="btn btn-danger me-sm-3 me-0" onClick={()=>delemp(record.id)}><i className="bi bi-trash-fill"></i></button>
                     </div>
                  </div>
                </div>
              </div>
              
            </div>)}
              <div className="mb-0 m-0 " >
                    <Card className="Card credentialing rounded-5" onClick={handleShow} style={{ width: "12.2rem", height: "14rem",}}>
                    <div className='overlay'></div>
                    <div className='circle'>
                  <CardBody className="card-body ">
                  
                  </CardBody>
                  </div>
                  <p>Register Counsellors</p>
                </Card>
                </div>
                </div>
              </div>

 
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Register Counsellor</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-2'>
          <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    onChange={(e) => setemail(e.target.value)}
                    autoFocus
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
              <Button  onClick={handleClick} className='btn-primary ' variant='primary'disabled={isLoading}>
                {isLoading ?  <Spinner size='sm'/>:null}
                Submit
              </Button>
            </Modal.Footer>
      </Modal>
      
    </>
  );
}

export default Employee;
