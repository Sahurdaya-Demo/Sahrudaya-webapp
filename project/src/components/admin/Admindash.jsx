import LoadExternalScript from '../../LoadExternalScript';
import { useEffect, useState,useRef} from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
// import Modal from 'react-bootstrap/Modal'
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import axios from 'axios';
// import Toast from 'react-bootstrap/Toast';
// import { Row,Col} from "react-bootstrap";
import CountUp from 'react-countup';
import { LinkApi } from '../Utils/Resource';
// import Tbadmin from './table';
function Admindash()
{
    // const windowWidth = useRef(window.innerWidth);
    // const windowHeight = useRef(window.innerHeight);
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
    // const [show, setShow] = useState(false);
    // const [showA, setShowA] = useState(false);
    // const[toastdata,settoastdata]=useState(false)
    // const handleShow = () => setShow(true);
    // const handleClose = () => {setShow(false);toggleCloseA();settoastdata(false)};
    // const toggleShowA = () => {setShowA(true)};
    // const toggleCloseA = () => {setShowA(false)};
    // const[id,setid]=useState("")
    // const[caemail,setcaemail]=useState("")
    // const[date,setdate]=useState("")
    // const[place,setplace]=useState("")
    // const[name,setname]=useState("")
    // const[Age, setage] = useState(0);
    // const[Gender, setgender] = useState("")
    // const[f_status,setfinstatus]=useState("")
    // const[m_status,setmaritalstat]=useState("")
    // const[School,setschool]=useState("")
    // const[religion,setreligion]=useState("")
    // const[f_education,setfeducation]=useState("")
    // const[f_occupation,setfoccupation]=useState("")
    // const[m_education,setmeducation]=useState("")
    // const[m_occupation,setmoccupation]=useState("")
    // const[problem,setproblem]=useState("")
    // const[history,sethistory]=useState("")
    // const[Intervention,setintervention]=useState("")
    // const[challenge,setchallenge]=useState("")
    // const[follow_ups,setsession]=useState("")
    // const[referral,setreferral]=useState("")
    // const[outcome,setoutcome]=useState("")
    // const[remarks,setremarks]=useState("")
    // const[status,setstatus]=useState("")
    // const[nameofcon,setnameofcon]=useState("")
    // const[data,setData]=useState([])
    const [pending,setpending]=useState([]);
    const [completed,setcompleted]=useState([]);
    const [overall, setoverall] = useState([]);
    const [males, setMales] = useState([]);
    const [females, setFemales] = useState([]);
    const [others, setOthers] = useState([]);
    // const [dtoast,setdtoast]=useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectYear, setSelectYear] = useState(new Date().getFullYear());
    // useEffect(() => {
    //     table();
    //     LoadExternalScript(['https://code.jquery.com/jquery-3.7.0.js','https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js','https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js','https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js','https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js','https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js']);
    //     }, []); 
        // useEffect(()=>{
        //    setInterval(()=>{
        //     table();
        //  },5000)   
        // },[])
        useEffect(() => {
            retrieveData();
            }, [selectedYear]);    
        
        useEffect(() => {
            retrieveData();
            }, [selectYear]);
            
        // const handlescroll=()=>{
        //     document.getElementById('modal')?.scrollIntoView({behavior:'smooth'})
        //     toggleShowA()
        // }
    
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
// const updatecaemail=async(id)=>{
//     console.log(caemail)
//     await axios({
//         method: 'post',
//         // url:`http://127.0.0.1:8000/emailchange/`,
//         url:`${LinkApi}emailchange/`,
//         data:{'email':caemail,'id':id},
//       }).then(response=>{
//         // console.log(response.data);
//         // setValidated(true)
//         // handleClose()
//       }
//       )
// }
// const fetchemail=async()=>{
//     // const response= await fetch(`http://127.0.0.1:8000/api/`)
//     const response= await fetch(`${LinkApi}api/`)
//     const jsonData = await response.json();
//     for(let i=0;i<Object.keys(jsonData).length;i++){
//         try{
//         if(jsonData[i].type==='admin')
//         delete jsonData[i]
//         }
//         catch{}
//     }
//     setdtoast(jsonData)
// }

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
                        {/* <div className="card cardey mb-4">
                            <div className="card-header">
                                    <i className="fa fa-table me-1"></i>
                                    DataTable Example
                            </div>
                            <div className="card-body">
                                <Tbadmin data={data}/>
                            </div>
                        </div> */}
                        
        </>
    )
}
export default Admindash