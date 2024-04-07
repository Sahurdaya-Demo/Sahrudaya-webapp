import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
// import '../counsellor/css/datatables.css'
// import '../counsellor/css/datatables.min.css'
import jszip from 'jszip';
// import pdfmake from 'pdfmake';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
// import view from './Data';
import Patients from './Patients';
import 'datatables.net-responsive-bs5';
import axios from "axios";
import { Row,Col} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { LinkApi } from '../Utils/Resource';
import LoadExternalScript from '../../LoadExternalScript';
const DataTableComponent = ({ data=[] }) => {
  window.JSZip = jszip;
    const tableRef = useRef(null);
    const handleShow = () => setShow(true);
    const handleClose = () => {setShow(false);setDisableButton(false);}
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(true);
    const[uid,setuid]=useState("")
    const[id,setid]=useState("")
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
    const [disableButton,setDisableButton] = useState(false)
     useEffect(() => {
        if (!tableRef.current || !Array.isArray(data) || data.length === 0) return;
        // console.log($(tableRef.current).data)
        // $(tableRef.current).DataTable().
        
      const dataTable = $(tableRef.current).DataTable({
        data,
        columns: [
          {title:'UID',data:'uniqueid',className:'text-start'},
          { title: 'Name', data: 'name' },
          { title: 'Gender', data: 'gender' },
          { title: 'Date', data: 'date' ,className:'text-start'},
          { title: 'Place Of Counselling', data: 'place_of_counselling' ,className:'text-start'},
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
                  <button class="btn btn-success btn-sm edit-btn">Edit</button>
                  <button class="btn btn-danger btn-sm  delete-btn">Delete</button>
                </div>
              `;
            }
          },
        ],
        responsive:true,
        dom: 'Bfrtip', // Include buttons in the DOM
        pageLength: 5,
      buttons: ['csv', 'excel', 'print'],
      initComplete: function () {
        this.api()
        .columns(':not(:last-child)')
        .every(function () {
            let column = this;
            let title = column.header().textContent.trim(); // Get column title
            let footer = $('<input type="text" placeholder="'+ title +'" />')
                .appendTo($(column.footer()).empty()) // Clear footer content and append input
                .on('keyup change', function () {
                    if (column.search() !== this.value) {
                        column.search(this.value).draw();
                    }
                });
                footer.addClass('form-control form-control-sm');
        });
        // Add event listeners to the buttons after DataTable initialization
        $(tableRef.current).on('click', '.edit-btn', function () {
          const rowData = dataTable.row($(this).closest('tr')).data();
          editRow(rowData.id);
        });

        $(tableRef.current).on('click', '.delete-btn', function () {
          const rowData = dataTable.row($(this).closest('tr')).data();
          delrecord(rowData.id,rowData.uniqueid);
        });
        const searchdiv = $(this).closest('#counsel_wrapper').find('.dt-search');
        const searchInput = $(this).closest('#counsel_wrapper').find('input[type="search"]');
        searchInput.addClass('form-control form-control-sm my-sm-2 my-2');
        searchdiv.addClass('float-lg-end'); // Add Bootstrap classes to style the input
        searchdiv.css({ display:'flex'});
        // searchInput.css({ width: '200px'}); // Set custom width and position
      },
      });
      return () => {
        $(tableRef.current).DataTable().destroy(true);
      };
    }, [data]);
    const getformdetails=async(id)=>{
      setValidated(false)
      // const result=await axios.get(`http://127.0.0.1:8000/formsubmit/${id}`)
      const result=await axios.get(`${LinkApi}formsubmit/${id}`)
      // console.log(result.data)
      setuid(result.data.uniqueid)
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
  }
    const handleeditClick = () => {
      setValidated(true)
      setDisableButton(!disableButton)
  };
  const handlesaveClick = () => {
      
      setDisableButton(!disableButton)
  };
  const submithandler=(event)=>
	 {
		const form = event.currentTarget;
         
          event.preventDefault();
       
		if (form.checkValidity() === false) {
     
		  event.stopPropagation();
		}
	  // handleReset();
		// setValidated(false);
    
	 }
    const delrecord=async(id,uid)=>{
      // console.log(uid)
      if (window.confirm('Are you sure you wish to delete this item?')){
      try{
      await axios({
          method: 'delete',
          // url:`http://127.0.0.1:8000/formsubmit/${id}/`,
          data:{'uid':uid},
          url:`${LinkApi}formsubmit/${id}/`,
        }).then(response=>{
          // console.log(response.data);
          window.location.reload();
        }
        )}
        catch{}
      }
  
    }
    const update=async(id)=>{
      let formField = new FormData()
      formField.append("nameofcounsellor",sessionStorage.getItem('name') )
      formField.append("email",sessionStorage.getItem('email') )
      formField.append('date',date)
      formField.append('place_of_counselling',place)
      formField.append('name',name)
      formField.append('age',Age)
      formField.append('gender',Gender)
      formField.append('finacial_status',f_status)
      formField.append('marital_status',m_status)
      formField.append('school',School)
      formField.append('religion',religion)
      formField.append('fathers_education',f_education)
      formField.append('fathers_occupation',f_occupation)
      formField.append('mothers_education',m_education)
      formField.append('mothers_occupation',m_occupation)
      formField.append('problem',problem)
      formField.append('history_of_problem',history)
      formField.append('intervention',Intervention)
      formField.append('challenges_by_counsellor',challenge)
      formField.append('number_of_followup_sections',follow_ups)
      formField.append('referral_service',referral)
      formField.append('outcome',outcome)
      formField.append('remarks',remarks)
      formField.append('status',status)
      formField.append('uniqueid',uid)
          try{
      await axios({
        method: 'PUT',
      //   url:`http://127.0.0.1:8000/formsubmit/${id}/`,
      url:`${LinkApi}formsubmit/${id}/`,
        data:formField,
      }).then(response=>{
        // console.log(response.data);
        setValidated(true)
        handleClose()
        window.location.reload();
      }
      )
    }
    catch{}
       }
    // Function to handle edit button click
  const editRow = (id) => {
    handleShow();getformdetails(id);
  };

     
   
    return (
        <>
        {/* <link rel='stylesheet'type='text/css' href='https://cdn.datatables.net/v/bs5/jszip-3.10.1/dt-2.0.2/b-3.0.1/b-html5-3.0.1/b-print-3.0.1/datatables.min.css'></link> */}
      <div>
        <table ref={tableRef} className="table table-striped display responsive" width="100%" id='counsel'>
          <thead>
          <tr>
                    <th></th>
                    <th>No data</th>
                    <th></th>
          </tr>
          </thead>
          <tbody />
                  <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
        </table>
      </div>
      <Modal size="xl" show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:"#75E3B9",opacity:".7",border:'none'}}>
                          <Modal.Title>Edit Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='p-2'style={{backgroundColor:"#75E3B9",opacity:".7"}}>
                          <Form onSubmit={submithandler} noValidate validated={validated}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="date">
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder=""
                                                value={date||''}
                                                onChange={(e) => setdate(e.target.value)}
                                                disabled={!disableButton}
                                                autoFocus
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Place of Counselling</Form.Label>
                                            <Form.Control as="select" onChange={(e) => {setplace(e.target.value);}} required disabled={!disableButton} value={place||""}>
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
                                            onChange={(e) => {setname(e.target.value);}}
                                            required
                                            value={name||""}
                                            disabled={!disableButton}                                            
                                            autoFocus
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder=""
                                            onChange={(e) => {setage(e.target.value);}} 
                                            value={Age||""}
                                            required
                                            autoFocus
                                            disabled={!disableButton}
                                            min={1}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control as="select" onChange={(e) => {setgender(e.target.value);}} disabled={!disableButton} value={Gender||""} required>
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
                                        <Form.Control as="select" onChange={(e) => {setfinstatus(e.target.value);}} disabled={!disableButton} value={f_status||""} required>
                                            <option></option>
                                            <option value="APL">APL</option>
                                            <option value="BPL">BPL</option>
                                        </Form.Control>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>Marital Status</Form.Label>
                                        <Form.Control as="select" onChange={(e) => {setmaritalstat(e.target.value);}} disabled={!disableButton} value={m_status||""} required>
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
                                        <Form.Control as="select" onChange={(e) => {setschool(e.target.value);}} disabled={!disableButton} value={School==='null'?null:School}>
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
                                            onChange={(e) => {setreligion(e.target.value);}}
                                            autoFocus
                                            disabled={!disableButton}
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
                                            onChange={(e) => {setfoccupation(e.target.value);}}
                                            autoFocus
                                            disabled={!disableButton}
                                            value={f_occupation==='null'?null:f_occupation}
                                        />
                                    </Col> 
                                    <Col md={6}>
                                        <Form.Label>Father's Education</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=" "
                                            maxLength={25}
                                            onChange={(e) => {setfeducation(e.target.value);}}
                                            autoFocus
                                            disabled={!disableButton}
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
                                            onChange={(e) => {setmoccupation(e.target.value);}}
                                            autoFocus
                                            disabled={!disableButton}
                                            value={m_occupation==='null'?null:m_occupation}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label>Mother's Education</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=" "
                                            maxLength={25}
                                            onChange={(e) => {setmeducation(e.target.value);}}
                                            autoFocus
                                            disabled={!disableButton}
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
                                            onChange={(e)=>{setproblem(e.target.value);}}
                                            required
                                            disabled={!disableButton}
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
                                            disabled={!disableButton}
                                            onChange={(e)=>{sethistory(e.target.value);}}
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
                                            disabled={!disableButton}
                                            onChange={(e)=>{setintervention(e.target.value);}}
                                            value={Intervention==='null'?null:Intervention}
                                        />
                                    </Col>
                                    <Col md={12}>
                                        <Form.Label>Challenges by Counsellor</Form.Label>
                                        <Form.Control as={"textarea"}
                                        className="col-12 rounded form-control" 
                                        rows={2}
                                        maxLength={200}
                                        disabled={!disableButton}
                                        onChange={(e)=>{setchallenge(e.target.value);}}
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
                                            disabled={!disableButton}
                                            onChange={(e) => {setreferral(e.target.value);}}
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
                                            disabled={!disableButton}
                                            onChange={(e) => {setoutcome(e.target.value);}}
                                            value={outcome==='null'?null:outcome}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label>Remarks</Form.Label>
                                        <Form.Control as={"textarea"}
                                            className="col-12 rounded form-control" 
                                            rows={3} 
                                            maxLength={200}
                                            onChange={(e) => {setremarks(e.target.value);}}
                                            disabled={!disableButton}
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
                                            onChange={(e) => {setsession(e.target.value);}}
                                            disabled={!disableButton}
                                            value={follow_ups||""}
                                            autoFocus
                                            required
                                            min={0}
                                        />
                                    </Col> 
                                    <Col md={6}> 
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as="select" onChange={(e) => {setstatus(e.target.value);}} required value={status||""} disabled={!disableButton}>
                                            <option value="Pending">Pending</option>
                                            <option value="Completed">Completed</option>                           
                                        </Form.Control>
                                    </Col>
                                </Row>
                                <Modal.Footer>
                                <Form.Group className="d-flex justify-content-end align-content-end">
                                <Button variant="btn btn-warning py-1 m-1 "  onClick={handleeditClick} disabled={disableButton} style={{color:'white'}}> Edit</Button>
                                <Button variant="btn btn-success py-1 m-1" type="submit" onClick={()=>{if(validated===false){handlesaveClick()};update(id);}} disabled={!disableButton}>Save</Button>
                                <Button variant="btn btn-danger py-1 m-1" onClick={handleClose}>Close</Button>
                        </Form.Group>
                        </Modal.Footer>
                         </Form>
                        </Modal.Body>
                                
                               
                        </Modal> 
                        {/* <Button onClick={()=>{$(tableRef.current).DataTable()}}>reload</Button> */}
      </>
    );
  };
  
  export default DataTableComponent;