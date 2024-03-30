import React from 'react'
import { Link, Outlet, useNavigate,useLocation } from 'react-router-dom';
import { useEffect,useState} from 'react';
import { Button,Image,Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import LoadExternalScript from '../../LoadExternalScript';
import axios from 'axios';
import { UnloadExternalScript } from '../../UnloadExternalScript';
import view from './Data';
import { LinkApi } from '../Utils/Resource';
function Counsellor() {
  let profilejson=[]
    const navigate=useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false);setDisableButton(false)};
    const handleShow = () => setShow(true);
    const [viewpass, setviewpass] = useState(false);
    const handleviewClose = () => setviewpass(false);
    const handleviewShow = () => setviewpass(true);
    const [disableButton,setDisableButton] = useState(false)
    const[phone,setphone]=useState('')
    const[qualification,setqualification]=useState('')
    const[age,setage]=useState('')
    const[name,setname]=useState('')
    const[profile,setprofile]=useState([])
    const [password,setpassword]=useState('')
    const [crpassword,setcrpassword]=useState('')
    
  useEffect(()=>{
    let token;
    token=sessionStorage.getItem('token')
    // console.log(location.state.token)
    if(token===null)
    navigate('/',{ replace: true })
    else{
        view(setprofile)
        sessionStorage.setItem('type','counselor')
    }
    return () => {
    
      UnloadExternalScript(['https://code.jquery.com/jquery-3.7.0.js','https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js','https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js','https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js','https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js','https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js']);
     
    };
    // return()=>{console.log('refresh')}
  },[])
  const changepassword=async()=>{
    if(password===crpassword){
    let formField = new FormData()
    formField.append('password',password)
    formField.append('password2',crpassword)
    await axios({
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`, // Include the access token in the Authorization header
       },
    // url:'http://127.0.0.1:8000/changepassword/',
    url:`${LinkApi}changepassword/`,
    data: formField,   
    }).then(response=>{
        alert(response.data.msg)
        handleviewClose()
    })
    }
    else{
        alert('Password and Confirm Password Are Not Same!!')
    }
  }

  const update=async(id)=>{
    let formField = new FormData()
      formField.append('name',name)
      formField.append('age',age)
      formField.append('qualification',qualification)
      formField.append('phone',phone)
    await axios({
      method: 'PUT',
      // url:`http://127.0.0.1:8000/api/${id}/`,
      url:`${LinkApi}api/${id}/`,
      data:formField,
    }).then(response=>{
      // console.log(response.data);
      handleClose()
    }
    )
  }
  const handletoggle=()=>{
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }
  }
  const handleeditClick = () => {
    setDisableButton(!disableButton)
};
const handlesaveClick = () => {
    setDisableButton(!disableButton)
};

  const Logout=async()=>{
    // await axios({
    //   method: 'post',
    //   // headers: {
    //   //   'Content-Type': 'application/json',
    //   //   'Authorization': `Bearer ${location.state.token.access}`, // Include the access token in the Authorization header
    //   // },
    //   data:location.state.token,
    //   url:'http://127.0.0.1:8000/logout/',
    // }).then(response=>{
    //   // console.log(location.state)
    //   // console.log(response.data.type);
    //   navigate('/',{ replace: true })
    //   // localStorage.setItem('sharedData','false')
    // })
    
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('type');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('name');
    navigate('/',{replace:true})
  }
  try{
    //  console.log(profile[0][0])
     profilejson=profile[0][0]
    }
  catch{}
  return (
    <>
    {/* <link rel='stylesheet'type='text/css' href='../../../counselcss/styles.css'></link>
    <link rel='stylesheet'type='text/css' href='../../../formcss/styles.css'></link>  */}
    <div className='sb-nav-fixed text-lg-start body'>
       
    <nav className="sb-topnav navbar navbar-expand navbar-dark ">
            
            {/* <a className="navbar-brand ps-3" href="index.html">Start Bootstrap</a> */}
            
                                <div className="navbar-brand ps-1">
                                <Link to="" className="nav-link" >
                                Counsellor Dashboard
                            </Link>
                                </div>
                                
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={handletoggle} href="#!"><i className="fa fa-bars"></i></button>
           
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                
            </form>
            
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4 smi-navbar" >
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="true"><i className="fa fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style={{left:'auto',right:0}}>
                        <li><a className="dropdown-item" onClick={handleShow}>Profile</a></li>
                        <li><a className="dropdown-item" onClick={handleviewShow} style={{cursor:'pointer'}}>Change Password</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" style={{cursor:"pointer"}} onClick={()=>{Logout()}}>Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link to="" className="nav-link" >
                                <div className="sb-nav-link-icon"><i className="fa fa-tachometer-alt"></i></div>
                                Dashboard
                            </Link>
                            <div className="sb-sidenav-menu-heading">Interface</div>
                            {/* <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fa fa-columns"></i></div>
                                Layouts
                                <div className="sb-sidenav-collapse-arrow"><i className="fa fa-angle-down"></i></div>
                            </a> */}
                            <Link className="nav-link" to="/counsellor/form">
                                <div className="sb-nav-link-icon"><i className="fa fa-columns"></i></div>
                                Form
                            </Link>
                            {/* <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link" href="layout-static.html">Static Navigation</a>
                                    <a className="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                                </nav>
                            </div> */}
                             <Link className="nav-link" to="/counsellor/Patients">
                                <div className="sb-nav-link-icon"><i className="fa fa-columns"></i></div>
                                Patients
                            </Link>
                            {/*  */}
                            <div className="sb-sidenav-menu-heading">Addons</div>
                            <a className="nav-link" href="charts.html">
                                <div className="sb-nav-link-icon"><i className="fa fa-chart-area"></i></div>
                                Charts
                            </a>
                            <a className="nav-link" href="tables.html">
                                <div className="sb-nav-link-icon"><i className="fa fa-table"></i></div>
                                Tables
                            </a>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as: <h1>{profilejson.name}</h1></div>
                        {/* Start Bootstrap */}
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        
                        
                        {/*  */}
                        <Outlet/>
                    </div>
                </main>
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2023</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
      </div>
      <Modal show={viewpass} onHide={handleviewClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-2'>
			<Form>
            <Form.Group className="mb-3" >
              <Form.Label>Enter New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                className='mb-2'
                onChange={(e) => setpassword(e.target.value)}
                autoFocus
              />
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                onChange={(e) => setcrpassword(e.target.value)}
                autoFocus
              />
            </Form.Group>
            
           
          </Form>
		  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleviewClose}>
            Close
          </Button>
          <Button  className='btn-primary' onClick={changepassword} variant='primary'>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose} centered>
        {/* <Modal.Header closeButton>
          <Modal.Title>Profile Page</Modal.Title>
        </Modal.Header> */}
        <Modal.Body className='p-2'>
			  <Form>
            
            <Image className="rounded-circle mx-auto d-block"
               
                src={`${LinkApi}${profilejson.image}`}
                style={{width: 125, height: 125, borderRadius: 125/ 2 }}
                // onChange={(e) => {setemailchange(e.target.value);}}
              />
              <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                defaultValue={profilejson.name}
                // readOnly
                // disabled
                disabled={!disableButton}
                autoFocus
                onChange={(e) => {setname(e.target.value);}}
              />
              </Form.Group>
               <Form.Group className="mb-3">
               <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={profilejson.email}
                autoFocus
                disabled
                readOnly
                // onChange={(e) => {setemailchange(e.target.value);}}
              />
               </Form.Group>
               <Form.Group className="mb-3">
               <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="age"
                defaultValue={profilejson.age}
                autoFocus
                disabled={!disableButton}
                onChange={(e) => {setage(e.target.value);}}
              />
              </Form.Group>
              <Form.Group className="mb-3">
            <Form.Label>Qualification</Form.Label>
              <Form.Control
                type="text"
                placeholder="qualification"
                defaultValue={profilejson.qualification}
                autoFocus
                disabled={!disableButton}
                onChange={(e) => {setqualification(e.target.value);}}
              />
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="number"
                placeholder="phone number"
                defaultValue={profilejson.phone}
                autoFocus
                disabled={!disableButton}
                onChange={(e) => {setphone(e.target.value);}}
              />
            
            </Form.Group>
            {/* <div className={`${btalert!==''?`${btalert==='success'?'alert alert-success':'alert alert-danger'}`:'visible-false'}`} role="alert">
                 {altmsg}
            </div> */}
          </Form>
		  </Modal.Body>
        <Modal.Footer>
            
          <Button variant="secondary" onClick={handleClose} >
            Close
          </Button>
          <Button variant="btn btn-primary"  onClick={handleeditClick} disabled={disableButton} >
            Edit
          </Button>
          <Button   className='btn btn-success' variant='primary' onClick={()=>{view(setprofile);update(profilejson.id);handlesaveClick();}} disabled={!disableButton} >
          {/* {isLoading ?  <Spinner size='sm'/>:null} */}
          Save
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  )
}

export default Counsellor
// export let name=localStorage.getItem('name')