
import { useEffect ,useState} from "react";
import LoadExternalScript from "../../LoadExternalScript";

import view from "./Data";
import DataSess from "./tableses";
import DataTableComponent from "./table";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import axios from "axios";
import { LinkApi } from "../Utils/Resource";
function Patients()
{
    const[profile,setprofile]=useState([])
    useEffect(()=>{
        LoadExternalScript(['https://code.jquery.com/jquery-3.7.0.js','https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js','https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js','https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js','https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js','https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js']);
    //  setInterval(()=>{
    // view(setprofile)
    //     },5000)
    view(setprofile)
    
    },[])
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today =yyyy + '-' + mm + '-' + dd;
    const handleShow = () => setShow(true);
    const handleClose = () => {setShow(false);}
    const [show, setShow] = useState(false);
    const handleShowdesc = () => setShowdesc(true);
    const handleClosedesc = () => {setShowdesc(false);}
    const [showdesc, setShowdesc] = useState(false);
    const[uid,setuid]=useState('');
    const[name,setname]=useState('');
    const[sessiondesc,setsessiondesc]=useState('')
    const[date,setdate]=useState(new Date())
    const insessdata=async()=>{
        if(date!==''&&sessiondesc!==''){
        let formField= new FormData()
        formField.append('uniqueid',uid);
        formField.append("nameofcounsellor",sessionStorage.getItem('name') )
		formField.append("email",sessionStorage.getItem('email') )
		formField.append('date',date)
        formField.append('name',name)
        formField.append('sessiondesc',sessiondesc)
        try{
            await axios({
             method: 'post',
             data:formField,
             url: `${LinkApi}crudsession/`,
            }).then(response=>{
                alert('Session Data Stored')
                window.location.reload();
            })
           }
         catch{
            alert('Data Insertion Error')
         }
        }
        else{
            alert('Date And Session Description Might Not Be Entered!!')
        }
    }
    const getname=async(uid)=>{
        try{
            await axios({
             method: 'post',
             data:{'uid':uid},
             url: `${LinkApi}getName/`,
            }).then(response=>{
                if(response.data.errors)
                alert('Invalid UID Of Patient')
                else{
                    setname(response.data.name)
                    handleShowdesc()
                }
            })
           }
         catch{
            // alert('Invalid UID Of Patient')
         }
    }
    
    return(
        <>
                        <div className="card cardey mb-4 mt-2">
                            <div className="card-header">
                                <i className="fa fa-table me-1"></i>
                                Patient Info Table
                            </div>
                            <div className="card-body">
                                <DataTableComponent data={profile[1]}/>
                           </div>
                        </div>
                        <div className="card cardey mb-4 mt-2">
                            <div className="card-header">
                                <i className="fa fa-table me-1"></i>
                                Session Info Table
                                <button className='btn btn-success btn-sm float-end' onClick={()=>handleShow()}><i className="fa fa-plus"></i></button>
                            </div>
                            <div className="card-body">
                            <DataSess data={profile[2]}/>
                            </div>
                        </div>
                   
                        <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:"#75E3B9",opacity:".7",border:'none'}}>
                          <Modal.Title>Enter The UID Of Patient</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='p-2'style={{backgroundColor:"#75E3B9",opacity:".7"}}>
                        
                        <Form.Group controlId="uid">
                            <Form.Label>UID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                onChange={(e) => setuid(e.target.value)}
                                autoFocus
                                />                              
                        </Form.Group> 
                        <button className='btn btn-success btn-sm float-end' onClick={()=>{if(uid!==''){getname(uid)}else{alert('Please Enter UID Of Patient')}}}>Submit</button>
                        </Modal.Body>
                        </Modal>
                        <Modal show={showdesc} onHide={handleClosedesc} centered>
                        <Modal.Header closeButton onClick={handleClosedesc} style={{backgroundColor:"#75E3B9",opacity:".7",border:'none'}}>
                          <Modal.Title>Add Session Description</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='p-2'style={{backgroundColor:"#75E3B9",opacity:".7"}}>
                        <Form.Group controlId="date" >
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" onChange={(e) => setdate(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={name||''}
                                disabled
                                // onChange={(e) => setname(e.target.value)}
                                autoFocus
                                />                              
                        </Form.Group> 
                        <Form.Group controlId="Session">
                            <Form.Label>Session Description</Form.Label>
                            <Form.Control
                                as={"textarea"}
                                rows={3}  
                                maxLength={200} 
                                onChange={(e) => setsessiondesc(e.target.value)}
                                autoFocus
                                />                              
                        </Form.Group> 
                        <button className='btn btn-success btn-sm float-end' onClick={insessdata}>Submit</button>
                        </Modal.Body>
                        </Modal>
      </>
    )


}

export default Patients;