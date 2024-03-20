import React, { useEffect, useRef,useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import '../counsellor/css/datatables.css'
import '../counsellor/css/datatables.min.css'
import Toast from 'react-bootstrap/Toast';
import { Row,Col} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import jszip from 'jszip';
// import pdfmake from 'pdfmake';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import axios from 'axios';
import { LinkApi } from '../Utils/Resource';
import 'datatables.net-responsive-bs5';
const Tbadmin=({data=[]})=>{
  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);
  const [show, setShow] = useState(false);
  const [showA, setShowA] = useState(false);
  const[toastdata,settoastdata]=useState(false)
  const handleShow = () => setShow(true);
  const handleClose = () => {setShow(false);toggleCloseA();settoastdata(false)};
  const toggleShowA = () => {setShowA(true)};
  const toggleCloseA = () => {setShowA(false)};
  const[id,setid]=useState("")
  const[caemail,setcaemail]=useState("")
  const[date,setdate]=useState("")
  const[place,setplace]=useState("")
  const[name,setname]=useState("")
  const[Age, setage] = useState(0);
  const[Gender, setgender] = useState("")
  const[f_status,setfinstatus]=useState("")
  const[m_status,setmaritalstat]=useState("")
  const[School,setschool]=useState("")
  const[religion,setreligion]=useState("")
  const[f_education,setfeducation]=useState("")
  const[f_occupation,setfoccupation]=useState("")
  const[m_education,setmeducation]=useState("")
  const[m_occupation,setmoccupation]=useState("")
  const[problem,setproblem]=useState("")
  const[history,sethistory]=useState("")
  const[Intervention,setintervention]=useState("")
  const[challenge,setchallenge]=useState("")
  const[follow_ups,setsession]=useState("")
  const[referral,setreferral]=useState("")
  const[outcome,setoutcome]=useState("")
  const[remarks,setremarks]=useState("")
  const[status,setstatus]=useState("")
  const[nameofcon,setnameofcon]=useState("")
  const [dtoast,setdtoast]=useState([]);
  const tableRef = useRef(null);
    useEffect(()=>{
        if (!tableRef.current || !Array.isArray(data) || data.length === 0) return;
        const dataTable = $(tableRef.current).DataTable({
        data,
        columns: [
          { title: 'Name', data: 'name' },
          { title: 'Name Of Counselor', data: 'nameofcounsellor' },
          { title: 'Gender', data: 'gender' },
          { title: 'Date', data: 'date' ,className:'text-start'},
          { title: 'Place Of Counselling', data: 'place_of_counselling' },
          { title: 'Problem', data: 'problem'},
          { title: 'Status', data: 'status'},
          { title: 'age', data: 'age',visible:false},
          { title: 'Financial Status', data: 'finacial_status',visible:false},
          { title: 'Marital Status', data: 'marital_status',visible:false},
          { title: 'School', data: 'school',visible:false},
          { title: 'Religion', data: 'religion',visible:false},
          { title: `Father's Occupation`, data: 'fathers_occupation',visible:false},
          { title: `Mother's Occupation`, data: 'mothers_occupation',visible:false},
          { title: `Father's Education`, data: 'fathers_education',visible:false},
          { title: `Mother's Education`, data: 'mothers_education',visible:false},
          { title: 'Intervention', data: 'intervention',visible:false},
          { title: 'Challenges By Counsellor', data: 'challenges_by_counsellor',visible:false},
          { title: 'Number of Followup Sessions', data: 'number_of_followup_sections',visible:false},
          { title: 'Referal Service', data: 'referral_service',visible:false},
          { title: 'Outcome', data: 'outcome',visible:false},
          { title: 'Remarks', data: 'remarks',visible:false},

          {
            title: 'Actions',
            data: null,
            sortable:false,
            render:function(data, type, row) {
                return `
                <div>
                  <button class="btn btn-primary btn-sm px-3 edit-btn">Edit</button>
                  <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                </div>
              `;
            }
          },
        ],
        responsive:true,
        dom: 'Bfrtip', // Include buttons in the DOM
        buttons: ['csv', 'excel', 'print'],
        initComplete: function () {

          $(tableRef.current).on('click', '.edit-btn', function () {
            const rowData = dataTable.row($(this).closest('tr')).data();
            // console.log(rowData.email)
            editRow(rowData.id,rowData.email);
          });
  
          $(tableRef.current).on('click', '.delete-btn', function () {
            const rowData = dataTable.row($(this).closest('tr')).data();
            delrecord(rowData.id);
          });
            const searchdiv = $(this).closest('#counsel_wrapper').find('.dt-search');
            const searchInput = $(this).closest('#counsel_wrapper').find('input[type="search"]');
            searchInput.addClass('form-control form-control-sm');
            searchdiv.addClass('float-lg-end'); // Add Bootstrap classes to style the input
            searchdiv.css({ display:'flex'});
            const searchbutton = $(this).closest('#counsel_wrapper').find('.dt-search');
            searchbutton.addClass('my-lg-1')
        },
        });
        return () => {
            $(tableRef.current).DataTable().destroy(true);
          };
    },[data])
    const delrecord=async(id)=>{
      if (window.confirm('Are you sure you wish to delete this item?')){
      try{
      await axios({
          method: 'delete',
          // url:`http://127.0.0.1:8000/formsubmit/${id}/`,
          url:`${LinkApi}formsubmit/${id}/`,
        }).then(response=>{
          console.log(response.data);
          alert('Record Deleted Successfully!!')
        }
        )}
        catch{}
      }
  
    }
    const editRow=(id,email)=>{
      handleShow();searchemail(email);getformdetails(id);
    }
    const getformdetails=async(id)=>{
        
      // const result=await axios.get(`http://127.0.0.1:8000/formsubmit/${id}`)
      const result=await axios.get(`${LinkApi}formsubmit/${id}`)
      // console.log(result.data)
      setdate(result.data.date)
      setid(result.data.id)
      setname(result.data.name)
      setage(result.data.age)
      setgender(result.data.gender)
      setfinstatus(result.data.finacial_status)
      setmaritalstat(result.data.marital_status)
      setschool(result.data.school)
      setreligion(result.data.religion)
      setfeducation(result.data.fathers_education)
      setfoccupation(result.data.fathers_occupation)
      setmeducation(result.data.mothers_education)
      setmoccupation(result.data.mothers_occupation)
      sethistory(result.data.history_of_problem)
      setproblem(result.data.problem)
      setintervention(result.data.intervention)
      setchallenge(result.data.challenges_by_counsellor)
      setsession(result.data.number_of_followup_sections)
      setreferral(result.data.referral_service)
      setoutcome(result.data.outcome)
      setremarks(result.data.remarks)
      setstatus(result.data.status);
      setplace(result.data.place_of_counselling)
      setnameofcon(result.data.nameofcounsellor)
  }
  const searchemail=async(email)=>{
    await axios({
        method: 'post',
        // url: 'http://127.0.0.1:8000/emailsearch/',
        url: `${LinkApi}emailsearch/`,
        data: {'email':email}
    }).then(response=>{
        if(response.data.errors)
        {
            toggleShowA()
            // console.log('not found')
        }
    })
}
const updatecaemail=async(id)=>{
  console.log(caemail)
  await axios({
      method: 'post',
      // url:`http://127.0.0.1:8000/emailchange/`,
      url:`${LinkApi}emailchange/`,
      data:{'email':caemail,'id':id},
    }).then(response=>{
      // console.log(response.data);
      // setValidated(true)
      // handleClose()
    }
    )
}
const fetchemail=async()=>{
  // const response= await fetch(`http://127.0.0.1:8000/api/`)
  const response= await fetch(`${LinkApi}api/`)
  const jsonData = await response.json();
  for(let i=0;i<Object.keys(jsonData).length;i++){
      try{
      if(jsonData[i].type==='admin')
      delete jsonData[i]
      }
      catch{}
  }
  setdtoast(jsonData)
}
const handlescroll=()=>{
  document.getElementById('modal')?.scrollIntoView({behavior:'smooth'})
  toggleShowA()
}

    return(
        <>
            <div>
                <table ref={tableRef} className="table table-striped display responsive" width="100%" id='counsel'>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody />
                </table>
            </div>
            <Modal size='xl' id='modal' show={show} onHide={handleClose} centered>
                        <Toast show={showA} onClose={toggleCloseA} className=' position-absolute  translate-middle-y' style={{zIndex:10000,top:`${windowHeight.current*(4.0/100)}%`,right:`${windowWidth.current*(2.0/100)}%`}}>
                        <Toast.Header>
                            <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                            />
                            <strong className="me-auto">Notification</strong>
                            {/* <small>11 mins ago</small> */}
                        </Toast.Header>
                        
                        <Toast.Body>{toastdata?'Change Access':<span>It Seems Like Counselor <strong>{nameofcon}</strong> Has Been Deleted. Would You Like To Change Access</span>}
                        <Form.Control as="select" onChange={(e)=>setcaemail(e.target.value)} required onClick={()=>fetchemail()}>
                            <option></option>
                            {
                                dtoast?.map(record=>
                                    <option key={record.id}>{record.email}</option>
                                    )
                            }
                            
                        </Form.Control>
                        <Button variant='success' className='mt-2' onClick={()=>updatecaemail(id)}>Submit</Button>
                        </Toast.Body>
                        </Toast> 
                        <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:"#75E3B9",opacity:".7",border:'none'}}>
                            <Modal.Title>Edit Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='p-2'style={{backgroundColor:"#75E3B9",opacity:".7"}}>
                        <Form className="mb-3" >
                        <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder=""
                                                value={date||''}
                                                
                                               disabled
                                                autoFocus
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Place of Counselling</Form.Label>
                                            <Form.Control as="select" disabled value={place||""}>
                                            <option></option>
                                            <option>Vypin-Rajagiri Sea Shore School</option>
                                            <option>Kakkanad</option>
                                            <option>Thevara-SH College(East Campus)</option>
                                            <option>Thevara-Higher Secondary School</option>
                                            <option>Thevara-SH UP</option>
                                            <option>Thevara-SH High School</option>
                                            <option>Karukutty-Christ the King monastery Church </option>
                                            <option>Kanjoor</option>
                                            <option>Eloor-SHJ UP School</option>
                                            <option>Kottarapalli-Amala Public School</option>
                                            <option>Manappuram-St Teresa's High School</option>
                                            <option>Pothy</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row> 
                                <Row> 
                                    <Col md={6}>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            maxLength={100}
                                            value={name||""}
                                           disabled                                            
                                            autoFocus
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder=""
                                            
                                            value={Age||""}
                                           
                                            autoFocus
                                           disabled
                                            min={1}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control as="select" disabled value={Gender||""} >
                                            <option></option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </Form.Control>
                                    </Col>
                                </Row>  
                                <Row>
                                    <Col md={3}>
                                        <Form.Label>Financial Status</Form.Label>
                                        <Form.Control as="select" disabled value={f_status||""} >
                                            <option></option>
                                            <option value="APL">APL</option>
                                            <option value="BPL">BPL</option>
                                        </Form.Control>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>Marital Status</Form.Label>
                                        <Form.Control as="select" disabled value={m_status||""} >
                                        <option></option>
                                        <option>Married</option>
                                        <option>Single</option>
                                        <option>Divorcee & Widower</option>
                                        <option>Widower</option>
                                        <option>Widow</option>
                                        <option>Separated</option>
                                        </Form.Control>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>School</Form.Label>
                                        <Form.Control as="select"disabled value={School==='null'?null:School}>
                                                <option></option>
                                                <option value="Government">Government</option>
                                                <option value="Aided">Aided</option>   
                                                <option value="Private">Private</option>                           
                                        </Form.Control>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>Religion</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=" "
                                            maxLength={20}
                                           
                                            autoFocus
                                           disabled
                                            value={religion==='null'?null:religion}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Label>Father's Occupation</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=" "
                                            maxLength={25}
                                           
                                            autoFocus
                                           disabled
                                            value={f_occupation==='null'?null:f_occupation}
                                        />
                                    </Col> 
                                    <Col md={6}>
                                        <Form.Label>Father's Education</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=" "
                                            maxLength={25}
                                            
                                            autoFocus
                                           disabled
                                            value={f_education==='null'?null:f_education}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Label>Mother's Occupation</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=" "
                                            maxLength={25}
                                           
                                            autoFocus
                                           disabled
                                            value={m_occupation==='null'?null:m_occupation}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label>Mother's Education</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=" "
                                            maxLength={25}
                                           
                                            autoFocus
                                           disabled
                                            value={m_education==='null'?null:m_education}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Label>Problem</Form.Label>
                                        <Form.Control as={"textarea"}
                                            className="col-12 rounded form-control" 
                                            rows={3}  
                                            maxLength={200} 
                                            
                                            required
                                           disabled
                                            value={problem||""}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Label>History of Problem</Form.Label>
                                        <Form.Control as={"textarea"} 
                                            className="col-12 rounded form-control" 
                                            rows={4}  
                                            maxLength={500} 
                                           disabled
                                           
                                            value={history==='null'?null:history}
                                        />
                                    </Col>
                                </Row>
                                <Row>  
                                    <Col md={12}>
                                        <Form.Label>Intervention</Form.Label>
                                        <Form.Control as={"textarea"}
                                            className="col-12 rounded form-control"
                                            rows={2}
                                            maxLength={100}
                                           disabled
                                            
                                            value={Intervention==='null'?null:Intervention}
                                        />
                                    </Col>
                                    <Col md={12}>
                                        <Form.Label>Challenges by Counsellor</Form.Label>
                                        <Form.Control as={"textarea"}
                                        className="col-12 rounded form-control" 
                                        rows={2}
                                        maxLength={200}
                                       disabled
                                        
                                        value={challenge==='null'?null:challenge}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Label>Referal Service</Form.Label>
                                        <Form.Control as={"textarea"}
                                            className="col-12 rounded form-control" 
                                            rows={2}
                                            maxLength={100}
                                           disabled
                                           
                                            value={referral==='null'?null:referral}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>  
                                        <Form.Label>Outcome</Form.Label>
                                        <Form.Control as={"textarea"}
                                            className="col-12 rounded form-control" 
                                            rows={3} 
                                            maxLength={250}
                                           disabled
                                           
                                            value={outcome==='null'?null:outcome}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label>Remarks</Form.Label>
                                        <Form.Control as={"textarea"}
                                            className="col-12 rounded form-control" 
                                            rows={3} 
                                            maxLength={200}
                                            
                                           disabled
                                            value={remarks==='null'?null:remarks}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>  
                                        <Form.Label>No. of follow up sessions</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder=" "
                                           
                                           disabled
                                            value={follow_ups||""}
                                            autoFocus
                                           
                                            min={0}
                                        />
                                    </Col> 
                                    <Col md={6}> 
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as="select"  value={status||""}disabled>
                                            <option value="Pending">Pending</option>
                                            <option value="Completed">Completed</option>                           
                                        </Form.Control>
                                    </Col>
                                </Row>
                                <Modal.Footer>
                                <Form.Group className="d-flex justify-content-end align-content-end">
                                {/* <Button variant="btn btn-warning py-1 m-1 "  onClick={handleeditClick} disabled={disableButton} style={{color:'white'}}> Edit</Button> */}
                                {/* <Button variant="btn btn-success py-1 m-1" onClick={()=>{handlesaveClick();update(id);}} disabled={true}>Save</Button> */}
                                <Button variant="btn btn-danger py-1 m-1" onClick={handleClose}>Close</Button>
                                <Button onClick={()=>{handlescroll();settoastdata(true)}} className="py-1 m-1">Change Access</Button>
                            
                            
                        </Form.Group>
                        </Modal.Footer>
                        </Form>
                        </Modal.Body>
                        
                    </Modal> 
        </>
    )

}
export default Tbadmin;