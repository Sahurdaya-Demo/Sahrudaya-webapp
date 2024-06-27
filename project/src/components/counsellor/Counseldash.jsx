import { useEffect,useState} from 'react';
import view from './Data';
// import AnimatedNumbers from "react-animated-numbers"
import CountUp from 'react-countup';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { LinkApi } from '../Utils/Resource';
function Counseldash(){
    const [profile,setprofile]=useState('')
    const[overall,setoverall]=useState([])
    let profilejson=[]
    let countjson=[]
    let pendingRecords;
    let completedRecords;
    let todayrecord;
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    defaults.maintainAspectRatio=false;
    defaults.responsive=true;
    useEffect(()=>{
		view(setprofile)
        retrieveData();
        // LoadExternalScript(['https://code.jquery.com/jquery-3.7.0.js','https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js','https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js','https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js','https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js','https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js']);
	},[])
    useEffect(() => {
        retrieveData();
        }, [selectedYear]); 
   
    try{
    profilejson=profile[0][0]
    countjson=profile[1]
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd ;
    pendingRecords=countjson.filter(record=>record.status==='Pending').length
    todayrecord=countjson.filter(record=>record.date===today).length
    completedRecords=countjson.filter(record=>record.status==='Completed').length
    }
    catch{}
    const retrieveData = async () => {
        const response = await fetch(`${LinkApi}formsubmit/`);
        const jsonData = await response.json();
        // console.log(jsonData)
        const overall = Array(12).fill(0);
        jsonData.forEach(record => {
            const date = new Date(record.date);
            if (date.getFullYear() === selectedYear) {
                const month = date.getMonth();
                if (record.email === sessionStorage.getItem('email')){ overall[month]++}
            }
        });
        setoverall(overall)
    }
    

    return(
        <>
                <div className="row">   
                    <div className='d-flex flex-column flex-sm-row mt-3'>                
                    <div className='card area col-lg-12 m-1 mb-3 ' style={{height:"410px", border:"none"}}>
                        <div className='card-body align-items-center d-flex justify-content-center'>
                            <ul className='circles'>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            </ul>
                            <p className='lexend'>
                            Hi , welcome <span className="lexend" style={{display:"inline",color:"lightgreen"}}>{sessionStorage.getItem('name')}</span> ! <img src='../assets/hand.gif' style={{width:"70px",height:"70px"}}></img>
                            </p>
                        </div>
                    </div>
                    <div className="card cardey mb-4">
                                    <div className="card-header">
                                        <i className="fa fa-chart-area me-1"></i>
                                        Overall Sessions Chart
                                        
                                         <select value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))} className='float-end border-black'>
                                        {Array.from({ length: new Date().getFullYear() - 2000 }, (_, index) => (
                                            <option key={index} value={2000 + index+1}>
                                                {2000 + index+1}
                                            </option>
                                        ))}
                                        </select>
                                    
                                    </div>
                                    
                                    <div className="card-body" style={{position:'relative'}}>
                                        <Line
                                            data={{
                                                labels:["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"],
                                                datasets:[
                                                    {
                                                        label:"Overall",
                                                        data:[overall[0],overall[1],overall[2],overall[3],overall[4],overall[5],overall[6],overall[7],overall[8],overall[9],overall[10],overall[11]],
                                                        // data:[ar]
                                                    },
                                                ],
                                            }}
                                            style={{height:'320px'}}
                                        />
                                    </div>
                    </div>
                    </div>
                    <div className="col-lg-4">
                        <div className=" card cardey mb-3">
                            <div className='card-body mb-3 card-he'>
                            <p className='font-lexend ' style={{fontSize:'25px'}}>
                            Pending Sessions
                            </p>

                            <CountUp                             
                                end={pendingRecords}
                                style={{ fontSize: '40px',  color: 'Red' }}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className=" card cardey mb-3">
                            <div className='card-body mb-3 card-he'>
                            <p className='font-lexend ' style={{fontSize:'25px'}}>
                            Completed Sessions
                            </p>

                            <CountUp                             
                                end={completedRecords}
                                style={{ fontSize: '40px',  color: 'lightgreen' }}/>
                            
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className=" card cardey mb-3">
                            <div className='card-body mb-3 card-he'>
                            <p className='font-lexend ' style={{fontSize:'25px'}}>
                                Today's Sessions
                            </p>

                            <CountUp                             
                                end={todayrecord}
                                style={{ fontSize: '40px',  color: 'lightgreen' }}/>
                            
                            </div>
                        </div>
                    </div>      
                </div>
        </>

    )
}
export default Counseldash;