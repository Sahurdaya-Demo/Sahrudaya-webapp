import { useEffect,useState} from 'react';
import view from './Data';
// import AnimatedNumbers from "react-animated-numbers"
import CountUp from 'react-countup';
import axios from 'axios';

function Counseldash(){
    const [profile,setprofile]=useState('')
    // const [pendingRecords, setPendingRecords] = useState([]);
    // const [completedRecords, setCompletedRecords] = useState([]);
    // const [pendingCount, setPendingCount] = useState(0);
    // const [completedCount, setCompletedCount] = useState(0);
    // let count=2;
    let profilejson=[]
    let countjson=[]
    let pendingRecords;
    let completedRecords;
    let todayrecord;
    // const[name,setname]=useState('')
    useEffect(()=>{
		view(setprofile)
        // retrieve()
	},[])
    // const retrieve=()=>{
    //     // const response= await fetch(`http://127.0.0.1:8000/formsubmit/`)
    //     // const jsonData = await response.json();
    //     try {
    //         // console.log(countjson)
    //         const pendingRecords = profile[1].filter(record => record.status === 'Pending');
    //         const completedRecords = profile[1].filter(record => record.status === 'Completed');
    //             setPendingRecords(pendingRecords.length);
    //             setCompletedRecords(completedRecords.length);
                
    //         } catch (error) {
    //             console.error('Error', error);
    //         }
    // }
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

    return(
        <>
                <div className="row">                   
                <div className='card area col-lg-12 m-1 mt-4 my-3 mb-3 ' style={{height:"450px", border:"none"}}>
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
                        Hi , welcome <span className="lexend" style={{display:"inline",color:"lightgreen"}}>{profilejson.name}</span> ! <img src='../assets/hand.gif' style={{width:"70px",height:"70px"}}></img>
                        </p>
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