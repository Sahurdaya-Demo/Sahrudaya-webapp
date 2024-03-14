import LoadExternalScript from '../../LoadExternalScript';
import { useEffect, useState,useRef} from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { Row,Col} from "react-bootstrap";
import CountUp from 'react-countup';
import { LinkApi } from '../Utils/Resource';
function Admindash()
{
    const windowWidth = useRef(window.innerWidth);
    const windowHeight = useRef(window.innerHeight);
    //  let Thevaracollege,Thevarahss,Thevaraup,Thevaraschool,Karukutty,Kanjoor,Eloor,Kottarapalli,Manappuram,Pothy,Kakkand;
    const[Vypin,setVypin]=useState(0);
    const[Thevaracollege,setThevaracollege]=useState('');
    const[Thevarahss,setThevarahss]=useState('');
    const[Thevaraup,setThevaraup]=useState('');
    const[Thevaraschool,setThevaraschool]=useState('');
    const[Karukutty,setKarukutty]=useState('');
    const[Kanjoor,setKanjoor]=useState('');
    const[Eloor,setEloor]=useState('');
    const[Kottarapalli,setKottarapalli]=useState('');
    const[Manappuram,setManappuram]=useState('');
    const[Pothy,setPothy]=useState('');
    const[Kakkand,setKakkand]=useState('');
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
    const[data,setData]=useState([])
    const [pending,setpending]=useState([]);
    const [completed,setcompleted]=useState([]);
    const [overall, setoverall] = useState([]);
    const [males, setMales] = useState([]);
    const [females, setFemales] = useState([]);
    const [others, setOthers] = useState([]);
    const [dtoast,setdtoast]=useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectYear, setSelectYear] = useState(new Date().getFullYear());
    useEffect(() => {
        
        LoadExternalScript(['https://code.jquery.com/jquery-3.7.0.js','https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js','https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js','https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js','https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js','https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js','adminjs/tablescript.js']);
        }, []); 
        useEffect(()=>{
            table();
         setInterval(()=>{
            table();
         },5000)   
        },[])
        useEffect(() => {
            retrieveData();
            }, [selectedYear]);    
        
        useEffect(() => {
            retrieveData();
            }, [selectYear]);
            
        const handlescroll=()=>{
            document.getElementById('modal')?.scrollIntoView({behavior:'smooth'})
            toggleShowA()
        }
    
        const retrieveData = async () => {
            const response = await fetch(`${LinkApi}formsubmit/`);
            const jsonData = await response.json();
    
            const maleCounts = Array(12).fill(0);
            const femaleCounts = Array(12).fill(0);
            const otherCounts = Array(12).fill(0);
            const completedCounts = Array(12).fill(0);
            const pendingCounts = Array(12).fill(0);
            const overallCounts = Array(12).fill(0);
    
            jsonData.forEach(record => {
                const date = new Date(record.date);
                if (date.getFullYear() === selectedYear) {
                    const month = date.getMonth();
                    if (record.gender === 'Male') maleCounts[month]++;
                    else if (record.gender === 'Female') femaleCounts[month]++;
                    else otherCounts[month]++;
                }
                if (date.getFullYear() === selectYear) {
                    const month = date.getMonth();
                    if (record.status === 'Completed') completedCounts[month]++;
                    else if (record.status === 'Pending') pendingCounts[month]++;
                    overallCounts[month]++;
                }
            });
            setVypin(jsonData.filter(record=>record.place_of_counselling==='Vypin-Rajagiri Sea Shore School').length)
            setKakkand(jsonData.filter(record=>record.place_of_counselling==='Kakkand').length)
            setThevaracollege(jsonData.filter(record=>record.place_of_counselling==='Thevara-SH College(East Campus)').length)
            setThevarahss(jsonData.filter(record=>record.place_of_counselling==='Thevara-Higher Secondary School').length)
            setThevaraup(jsonData.filter(record=>record.place_of_counselling==='Thevara-SH UP').length)
            setThevaraschool(jsonData.filter(record=>record.place_of_counselling==='Thevara-SH High School').length)
            setKarukutty(jsonData.filter(record=>record.place_of_counselling==='Karukutty-Christ the King monsatery church').length)
            setKanjoor(jsonData.filter(record=>record.place_of_counselling==='Kanjoor').length)
            setEloor(jsonData.filter(record=>record.place_of_counselling==='Eloor-SHJ UP School').length)
            setKottarapalli(jsonData.filter(record=>record.place_of_counselling==='Kottarapalli-Amala Public School').length)
            setManappuram(jsonData.filter(record=>record.place_of_counselling===`Manappuram-St Teresa's High School`).length)
            setPothy(jsonData.filter(record=>record.place_of_counselling===`Pothy`).length)
            setMales(maleCounts);
            setFemales(femaleCounts);
            setOthers(otherCounts);
            setcompleted(completedCounts);
            setpending(pendingCounts);
            setoverall(overallCounts);
            
        };
        const table=async()=>{
            // const response = await fetch('http://127.0.0.1:8000/formsubmit/');
            const response = await fetch(`${LinkApi}formsubmit/`);
            const jsontb = await response.json();
            setData(jsontb)
        }
    // useEffect(()=>{
    //     LoadExternalScript(['https://code.jquery.com/jquery-3.7.0.js','https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js','https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js','https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js','https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js','https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js','adminjs/tablescript.js']);
    //     new PureCounter();
    //     retrieve()
    //   },[])
    //   const retrieve=async()=>{
    //     const response= await fetch(`http://127.0.0.1:8000/formsubmit/`)
    //     const jsonData = await response.json();
    //     setdata(jsonData)
    //     for(let i=0;i<12;i++){
    //         males.push(jsonData.filter(record=>record.gender==='Male'&&new Date(record.date).getMonth()===i).length)
    //         females.push(jsonData.filter(record=>record.gender==='Female'&&new Date(record.date).getMonth()===i).length)
    //         others.push(jsonData.filter(record=>record.gender==='Others'&&new Date(record.date).getMonth()===i).length)
        
    //     }
    //     for(let i=0;i<12;i++){
    //         pending.push(jsonData.filter(record=>record.status==='Pending'&&new Date(record.date).getMonth()===i).length)
    //         completed.push(jsonData.filter(record=>record.status==='Completed'&&new Date(record.date).getMonth()===i).length)
    //         overall.push(jsonData.filter(record=>new Date(record.date).getMonth()===i).length)
        
    //     }
    // }
    
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
  defaults.maintainAspectRatio=false;
  defaults.responsive=true;

  const datasess = {
  labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL','AUG','SEP','OCT','NOV','DEC'],
  datasets: [
    {
      label: 'Completed',
      fill: false,
      lineTension: 0.1,
      data: [completed[0],completed[1],completed[2],completed[3],completed[4],completed[5],completed[6],completed[7],completed[8],completed[9],completed[10],completed[11]]
      },
    {
      label: 'Pending',
      fill: false,
      lineTension: 0.1,
       data: [pending[0],pending[1],pending[2],pending[3],pending[4],pending[5],pending[6],pending[7],pending[8],pending[9],pending[10],pending[11]]
    },
    {
      label: 'Overall',
      fill: false,
      lineTension: 0.1,
       data: [overall[0],overall[1],overall[2],overall[3],overall[4],overall[5],overall[6],overall[7],overall[8],overall[9],overall[10],overall[11]]
    },
  ]
};
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

    return(
        <>
        <div className="row mt-lg-4" style={{alignItems:'center',justifyContent:'center'}}>
                            <h1>Centers</h1>
                            <div className="col-xl-4 col-md-6">
                                <div className="card cardey text-white mb-4 " >
                                <div className="card-body">
                                    <div className='d-flex flex-lg-row flex-column align-items-center'>
                                    <div className="col-lg-9 mb-3 mb-lg-0" style={{fontWeight:600,fontSize:'0.8rem'}}>Vypin-Rajagiri Sea Shore School</div>
                                    <div className='col-lg-4'>
                                    
                                    <CountUp        
                                    className="display-6 "                     
                                    end={Vypin}
                                    style={{fontFamily:'Poppins-Regular, sans-serif',fontWeight:600,textShadow: "2px 2px 3px rgba(0, 0, 0, 0.5)"}}/>
                                    </div>
                                    </div>
                                   </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card cardey text-white mb-4 " >
                                <div className="card-body">
                                    <div className='d-flex flex-lg-row flex-column align-items-center'>
                                    <div className="col-lg-9 mb-3 mb-lg-0" style={{fontWeight:600,fontSize:'0.8rem'}}>Kakkanad</div>
                                    <div className='col-lg-4'>
                                    
                                    <CountUp        
                                    className="display-6 "                     
                                    end={Kakkand}
                                    style={{fontFamily:'Poppins-Regular, sans-serif',fontWeight:600,textShadow: "2px 2px 3px rgba(0, 0, 0, 0.5)"}}/>
                                    </div>
                                    </div>
                                   </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card cardey text-white mb-4 " >
                                <div className="card-body">
                                    <div className='d-flex flex-lg-row flex-column align-items-center'>
                                    <div className="col-lg-9 mb-3 mb-lg-0" style={{fontWeight:600,fontSize:'0.8rem'}}>Thevara-SH College(East Campus)</div>
                                    <div className='col-lg-4'>
                                    
                                    <CountUp        
                                    className="display-6 "                     
                                    end={Thevaracollege}
                                    style={{fontFamily:'Poppins-Regular, sans-serif',fontWeight:600,textShadow: "2px 2px 3px rgba(0, 0, 0, 0.5)"}}/>
                                    </div>
                                    </div>
                                   </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card cardey text-white mb-4 " >
                                <div className="card-body">
                                    <div className='d-flex flex-lg-row flex-column align-items-center'>
                                    <div className="col-lg-9 mb-3 mb-lg-0" style={{fontWeight:600,fontSize:'0.8rem'}}>Thevara-Higher Secondary School</div>
                                    <div className='col-lg-4'>
                                    
                                    <CountUp        
                                    className="display-6 "                     
                                    end={Thevarahss}
                                    style={{fontFamily:'Poppins-Regular, sans-serif',fontWeight:600,textShadow: "2px 2px 3px rgba(0, 0, 0, 0.5)"}}/>
                                    </div>
                                    </div>
                                   </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card cardey text-white mb-4 " >
                                <div className="card-body">
                                    <div className='d-flex flex-lg-row flex-column align-items-center'>
                                    <div className="col-lg-9 mb-3 mb-lg-0" style={{fontWeight:600,fontSize:'0.8rem'}}>Thevara-SH UP</div>
                                    <div className='col-lg-4'>
                                    
                                    <CountUp        
                                    className="display-6 "                     
                                    end={Thevaraup}
                                    style={{fontFamily:'Poppins-Regular, sans-serif',fontWeight:600,textShadow: "2px 2px 3px rgba(0, 0, 0, 0.5)"}}/>
                                    </div>
                                    </div>
                                   </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card cardey text-white mb-4 " >
                                <div className="card-body">
                                    <div className='d-flex flex-lg-row flex-column align-items-center'>
                                    <div className="col-lg-9 mb-3 mb-lg-0" style={{fontWeight:600,fontSize:'0.8rem'}}>Thevara-SH High School</div>
                                    <div className='col-lg-4'>
                                    
                                    <CountUp        
                                    className="display-6 "                     
                                    end={Thevaraschool}
                                    style={{fontFamily:'Poppins-Regular, sans-serif',fontWeight:600,textShadow: "2px 2px 3px rgba(0, 0, 0, 0.5)"}}/>
                                    </div>
                                    </div>
                                   </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card cardey text-white mb-4 " >
                                <div className="card-body">
                                    <div className='d-flex flex-lg-row flex-column align-items-center'>
                                    <div className="col-lg-9 mb-3 mb-lg-0" style={{fontWeight:600,fontSize:'0.8rem'}}>Karukutty-Christ the King monastery Church </div>
                                    <div className='col-lg-4'>
                                    
                                    <CountUp        
                                    className="display-6 "                     
                                    end={Karukutty}
                                    style={{fontFamily:'Poppins-Regular, sans-serif',fontWeight:600,textShadow: "2px 2px 3px rgba(0, 0, 0, 0.5)"}}/>
                                    </div>
                                    </div>
                                   </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card cardey text-white mb-4 " >
                                <div className="card-body">
                                    <div className='d-flex flex-lg-row flex-column align-items-center'>
                                    <div className="col-lg-9 mb-3 mb-lg-0" style={{fontWeight:600,fontSize:'0.8rem'}}>Kanjoor</div>
                                    <div className='col-lg-4'>
                                    
                                    <CountUp        
                                    className="display-6 "                     
                                    end={Kanjoor}
                                    style={{fontFamily:'Poppins-Regular, sans-serif',fontWeight:600,textShadow: "2px 2px 3px rgba(0, 0, 0, 0.5)"}}/>
                                    </div>
                                    </div>
                                   </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card cardey text-white mb-4 " >
                                <div className="card-body">
                                    <div className='d-flex flex-lg-row flex-column align-items-center'>
                                    <div className="col-lg-9 col-lg-9 mb-3 mb-lg-0" style={{fontWeight:600,fontSize:'0.8rem'}}>Eloor-SHJ UP School</div>
                                    <div className='col-lg-4'>
                                    
                                    <CountUp        
                                    className="display-6 "                     
                                    end={Eloor}
                                    style={{fontFamily:'Poppins-Regular, sans-serif',fontWeight:600,textShadow: "2px 2px 3px rgba(0, 0, 0, 0.5)"}}/>
                                    </div>
                                    </div>
                                     </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card cardey text-white mb-4 " >
                                <div className="card-body">
                                    <div className='d-flex flex-lg-row flex-column align-items-center'>
                                    <div className="col-lg-9 col-lg-9 mb-3 mb-lg-0" style={{fontWeight:600,fontSize:'0.8rem'}}>Kottarapalli Amala Public School</div>
                                    <div className='col-lg-4'>
                                    
                                    <CountUp        
                                    className="display-6 "                     
                                    end={Kottarapalli}
                                    style={{fontFamily:'Poppins-Regular, sans-serif',fontWeight:600,textShadow: "2px 2px 3px rgba(0, 0, 0, 0.5)"}}/>
                                    </div>
                                    </div>
                                     </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card cardey text-white mb-4">
                                    <div className="card-body">
                                        <div className='d-flex flex-lg-row flex-column align-items-center'>
                                            <div className="col-lg-9 col-lg-9 mb-3 mb-lg-0" style={{ fontWeight: 600, fontSize: '0.8rem' }}>Manappuram St.Theresa's high school</div>
                                            <div className='col-lg-4'>
                                                
                                                <CountUp        
                                                className="display-6 "                     
                                                end={Manappuram}
                                                style={{fontFamily:'Poppins-Regular, sans-serif',fontWeight:600,textShadow: "2px 2px 3px rgba(0, 0, 0, 0.5)"}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card cardey text-white mb-4 " >
                                <div className='card-body'>
                                    <div className='d-flex flex-lg-row flex-column align-items-center'>
                                    <div className=" col-lg-9 col-lg-9 mb-3 mb-lg-0" style={{fontWeight:600,fontSize:'0.8rem'}}>Pothy</div>
                                    <div className='col-lg-4'>
                                    
                                    <CountUp        
                                    className="display-6 "                     
                                    end={Pothy}
                                    style={{fontFamily:'Poppins-Regular, sans-serif',fontWeight:600,textShadow: "2px 2px 3px rgba(0, 0, 0, 0.5)"}}/>
                                    </div>
                                    </div>
                                     </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="card cardey mb-4">
                                    <div className="card-header">
                                        <i className="fa fa-chart-area me-1"></i>
                                        Gender Based Sessions Chart
                                        
                                         <select value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))} className='float-end border-black'>
                                        {Array.from({ length: new Date().getFullYear() - 2000 }, (_, index) => (
                                            <option key={index} value={2000 + index+1}>
                                                {2000 + index+1}
                                            </option>
                                        ))}
                                        </select>
                                    
                                    </div>
                                    
                                    <div className="card-body" style={{position:'relative'}}>
                                        <Bar
                                            data={{
                                                labels:["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"],
                                                datasets:[
                                                    {
                                                        label:"MALES",
                                                        data:[males[0],males[1],males[2],males[3],males[4],males[5],males[6],males[7],males[8],males[9],males[10],males[11]],
                                                        // data:[ar]
                                                    },
                                                    {
                                                        label:"FEMALES",
                                                        data:[females[0],females[1],females[2],females[3],females[4],females[5],females[6],females[7],females[8],females[9],females[10],females[11]],
                                                    },
                                                    {
                                                        label:"OTHERS",
                                                        data:[others[0],others[1],others[2],others[3],others[4],others[5],others[6],others[7],others[8],others[9],others[10],others[11]],
                                                    },
                                                ],
                                            }}
                                            style={{height:'350px'}}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-xl-6">
                                <div className="card cardey mb-4">
                                    <div className="card-header">
                                        <i className="fa fa-chart-area me-1"></i>
                                        Sessions Chart
                                        
                                         <select value={selectYear} onChange={e => setSelectYear(parseInt(e.target.value))} className='float-end border-black'>
                                        {Array.from({ length: new Date().getFullYear() - 2000 }, (_, index) => (
                                            <option key={index} value={2000 + index+1}>
                                                {2000 + index+1}
                                            </option>
                                        ))}
                                    </select>
                            
                                    </div>
                                    <div className="card-body" style={{position:'relative'}}>
                                     <Line data={datasess}   style={{height:'350px'}}/>
                                    </div>
                                    </div>
                                    </div>
                                    
                        </div> 
                        <div className="card cardey mb-4">
                            <div className="card-header">
                                <i className="fa fa-table me-1"></i>
                                DataTable Example
                            </div>
                            <div className="card-body">
                            <table id="example" className="table table-striped" style={{width:'100%'}}>
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
                                {data?.map(record => 
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
                                        <div className='button-group'>
                                        <button className='btn btn-danger' onClick={()=>{delrecord(record.id)}}>Delete</button>
                                        <button className='btn btn-warning ms-2' style={{color:'white'}} onClick={()=>{handleShow();searchemail(record.email);getformdetails(record.id);}}>View</button>
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
                           </table>
                        
                           </div>
                           {/* {console.log(screen.height)} */}
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
export default Admindash