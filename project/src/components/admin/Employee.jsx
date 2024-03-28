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
  const[loading,setloading]=useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [Records,setRecords]=useState([])
  const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[btalert,setbtalert]=useState('')
  const[altmsg,setaltmsg]=useState('')
  const[email,setemail]=useState('')
  // let json;
  useEffect(()=>{
  // setInterval(()=>{
  //   retrieve()
  // },5000)
  retrieve()
  },[])
  const retrieve=async()=>{
    let todayrecord;
    let yesterdayrecord;
    let overall;
    
    // const response= await fetch(`http://127.0.0.1:8000/api/`)
    const response= await fetch(`${LinkApi}api/`)
    const jsonData = await response.json();
    // const responsecon= await fetch(`http://127.0.0.1:8000/formsubmit/`)
    const responsecon= await fetch(`${LinkApi}formsubmit/`)
    const jsonDatacon = await responsecon.json();
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var today = new Date();
    var ddy = String(yesterday.getDate()).padStart(2, '0');
    var mmy = String(yesterday.getMonth() + 1).padStart(2, '0'); 
    var yyy =  yesterday.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
     today = yyyy + '-' + mm + '-' + dd ;
     yesterday = yyy + '-' + mmy + '-' + ddy;
    //  console.log(today,"",yesterday)
    for(let i=0;i<Object.keys(jsonData).length;i++)
    {
      yesterdayrecord=0
      todayrecord=0;
      overall=0;
      for(let j=0;j<Object.keys(jsonDatacon).length;j++){
      if(jsonData[i].email===jsonDatacon[j].email){
        overall++;
        if(jsonDatacon[j].date===today)
          todayrecord++
        if(jsonDatacon[j].date===yesterday)
          yesterdayrecord++
      }
      }
      jsonData[i]['todaycount']=todayrecord;
      jsonData[i]['yesterdaycount']=yesterdayrecord;
      jsonData[i]['overall']=overall;
    }
    
    for(let i=0;i<Object.keys(jsonData).length;i++){
      try{
      if(jsonData[i].type==='admin')
      delete jsonData[i]
      }
      catch{}
    }
    
    // console.log(jsonData)
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
  if (window.confirm('Are you sure you wish to delete this item?')){
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
  // const toggleCardBody = (id) => {
  //   setRecords(prevItems =>
  //     prevItems.map(record =>
  //       record.id === id ? { ...record, showCardBody: !record.showCardBody } : record
  //     )
  //   );
  // };
  return (
    <>
      {/* <link rel='stylesheet' type='text/css' href='../../../empcss/styles.css'></link> */}
          <div className='counsellors'>
           <div className="row-12 p-0 d-flex flex-wrap justify-content-center flex-sm-row flex-column">

            {Records.map(record=>
            <div className="card mb-3 m-3 " style={{maxWidth: "500px"}} key={record.id}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src="../../../loading.gif" className="rounded-start object-fit-cover" style={{height:'100%',width:'100%',display: loading ? "block" : "none"}}alt="Loading" />
                  <img src={record.image}  onLoad={imageLoaded} className=" object-fit-cover" alt="..." style={{height:'100%',width:'100%',display: loading ? "none" : "block"}}/>
                </div>
                <div className="col-md-8">
                  <div className="card-body " style={{padding:"3.5px"}}>
                    <h5 className="card-title text-uppercase text-success mt-3 ms-1">{record.name}</h5>
                    <hr></hr>
                    <p className="card-text text-success ms-1">Age : <small className="text-body-secondary text-dark">{record.age}</small></p>
                    <p className="card-text text-success ms-1">Email : <small className="text-body-secondary text-dark">{record.email}</small></p>
                    <p className="card-text text-success ms-1">Phone No. : <small className="text-body-secondary text-dark">{record.phone}</small></p>
                    <p className="card-text text-success ms-1">Qualification : <small className="text-body-secondary text-dark">{record.qualification}</small></p>

              
                  <OverlayTrigger
                  trigger="click"
                  // key={placement}
                  placement='bottom'
                  overlay={
                    <Popover >
                      <Popover.Header as="h3">Today    :<strong> {record.todaycount}</strong></Popover.Header>
                      <Popover.Header as="h3">Yesterday:<strong> {record.yesterdaycount}</strong></Popover.Header>
                      <Popover.Header as="h3">Overall:< strong> {record.overall}</strong></Popover.Header>
                    </Popover>
                  }
                >
                <Button variant="success" className='mt-4'>Submissions</Button>
                </OverlayTrigger>
                 {/* <button className="btn btn-danger float-end mb-1  mt-4" onClick={()=>delemp(record.id)}>Delete</button> */}
                  </div>
                </div>
              </div>
              <div className='card-footer'>
              <button className="btn btn-danger float-end mb-1  mt-4" onClick={()=>delemp(record.id)}>Delete</button>
              </div>
            </div>)}

{/* <div className="col-12 p-0 d-flex flex-wrap justify-content-center flex-sm-row flex-column"> */}

              <div className="mb-0 m-0 " >
                  <Card className="Card credentialing" onClick={handleShow} style={{ width: "12.2rem", height: "16rem",}}>
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
