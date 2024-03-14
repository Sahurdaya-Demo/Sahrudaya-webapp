
import { useEffect ,useState} from "react";
import LoadExternalScript from "../../LoadExternalScript";
// import { UnloadExternalScript } from "../../UnloadExternalScript";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import view from "./Data";
import axios from "axios";
import { Row,Col} from "react-bootstrap";
import { LinkApi } from "../Utils/Resource";
import { Link } from "react-router-dom";
import DataTableComponent from "./table";
function Patients()
{
    const[profile,setprofile]=useState([])
    LoadExternalScript(['https://code.jquery.com/jquery-3.7.0.js','https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js','https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js','https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js','https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js','https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js']);
    useEffect(()=>{
    // LoadExternalScript(['https://code.jquery.com/jquery-3.7.0.js','https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js','https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js','https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js','https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js','https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js']);
    //  setInterval(()=>{
    // view(setprofile)
    //     },5000)
    view(setprofile)
    
    },[])

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


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {setShow(false);setDisableButton(false);}
    
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
    }
    )
  }
  catch{}
     }

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

    const handleeditClick = () => {
        setValidated(true)
        setDisableButton(!disableButton)
    };
    const handlesaveClick = () => {
        
        setDisableButton(!disableButton)
    };
    const getformdetails=async(id)=>{
        setValidated(false)
        // const result=await axios.get(`http://127.0.0.1:8000/formsubmit/${id}`)
        const result=await axios.get(`${LinkApi}formsubmit/${id}`)
        console.log(result.data)
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

    const [validated, setValidated] = useState(true);


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
    
    return(
        <>
        <div className="card cardey mb-4 mt-2">
                            <div className="card-header">
                                <i className="fa fa-table me-1"></i>
                                DataTable Example
                            </div>
                            <div className="card-body">
                            {/* <table id="counsel" className="table table-striped" style={{width:'100%'}}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Name of Couneslor</th>
                                        <th>Gender</th>
                                        <th>Date</th>
                                        <th>Place Of Couneslling</th>
                                        <th>Problem</th>
                                        <th>Status</th>
                                        
                                        <th>Age</th>
                                        <th>finacial_status</th>
                                        <th>marital_status</th>
                                        <th>school</th>
                                        <th>religion</th>
                                        <th>fathers_occupation</th>
                                        <th>mothers_occupation</th>
                                        <th>fathers_education</th>
                                        <th>mothers_education</th>
                                        <th>history_of_problem</th>
                                        <th>intervention</th>
                                        <th>challenges_by_counsellor</th>
                                        <th>number_of_followup_sections</th>
                                        <th>referral_service</th>
                                        <th>outcome</th>
                                        <th>remarks</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {profile[1]?.map(record => 
                                        <tr key={record.id}>
                                        <td>{record.name}</td>
                                        <td>{record.nameofcounsellor}</td>
                                        <td>{record.gender}</td>
                                        <td>{record.date}</td>
                                        <td>{record.place_of_counselling}</td>
                                        <td>{record.problem}</td>
                                        <td>{record.status}</td>
                                        <td>{record.age}</td>
                                        <td>{record.finacial_status}</td>
                                        <td>{record.marital_status}</td>
                                        <td>{record.school}</td>
                                        <td>{record.religion}</td>
                                        <td>{record.fathers_occupation}</td>
                                        <td>{record.mothers_occupation}</td>
                                        <td>{record.fathers_education}</td>
                                        <td>{record.mothers_education}</td>
                                        <td>{record.history_of_problem}</td>
                                        <td>{record.intervention}</td>
                                        <td>{record.challenges_by_counsellor}</td>
                                        <td>{record.number_of_followup_sections}</td>
                                        <td>{record.referral_service}</td>
                                        <td>{record.outcome}</td>
                                        <td>{record.remarks}</td>
                                        <td>
                                        <div className="button-group">
                                        <button className='btn btn-danger' onClick={()=>{delrecord(record.id)}}>Delete</button>
                                        <button className='btn btn-warning ms-1' style={{color:'white'}} onClick={()=>{handleShow();getformdetails(record.id)}}>View</button>
                                        </div>
                                        </td>
                                        </tr>
                                        )}
                                    
                                </tbody>
                                <tfoot>
                                    <tr>
                                    <th>Name</th>
                                        <th>Name of Couneslor</th>
                                        <th>Gender</th>
                                        <th>Date</th>
                                        <th>Place Of Couneslling</th>
                                        <th>Problem</th>
                                        <th>Status</th>
                                        
                                        <th>Age</th>
                                        <th>finacial_status</th>
                                        <th>marital_status</th>
                                        <th>school</th>
                                        <th>religion</th>
                                        <th>fathers_occupation</th>
                                        <th>mothers_occupation</th>
                                        <th>fathers_education</th>
                                        <th>mothers_education</th>
                                        <th>history_of_problem</th>
                                        <th>intervention</th>
                                        <th>challenges_by_counsellor</th>
                                        <th>number_of_followup_sections</th>
                                        <th>referral_service</th>
                                        <th>outcome</th>
                                        <th>remarks</th>
                                        <th>Action</th>
                                    </tr>
                                    
                                </tfoot>
                           </table> */}
                                <DataTableComponent data={profile[1]}/>
                           </div>
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
      </>
    )


}

export default Patients;