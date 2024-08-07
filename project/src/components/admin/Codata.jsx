import React, { useEffect, useState ,useRef} from 'react';
import Tbadmin from './table';
import LoadExternalScript from '../../LoadExternalScript';
import { LinkApi } from '../Utils/Resource';
import AdataSess from './tableses';
function Codata(){
    const[data,setData]=useState([])
    const[datas,setDatas]=useState([])
    useEffect(() => {
        table();
        tablesess();
        LoadExternalScript(['https://code.jquery.com/jquery-3.7.0.js','https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js','https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js','https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js','https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js','https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.min.js','https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js']);
        }, []); 
        const table=async()=>{
            // const response = await fetch('http://127.0.0.1:8000/formsubmit/');
            const response = await fetch(`${LinkApi}formsubmit/`);
            const jsontb = await response.json();
            setData(jsontb)
        }
        const tablesess=async()=>{
            // const response = await fetch('http://127.0.0.1:8000/formsubmit/');
            const response = await fetch(`${LinkApi}crudsession/`);
            const jsontb = await response.json();
            setDatas(jsontb)
        }
        return(
        <>
            <div className="card cardey mb-4 mt-3">
                <div className="card-header">
                    <i className="fa fa-table me-1"></i>
                     Patient Details
                    </div>
                <div className="card-body">
                    <Tbadmin data={data}/>
                </div>
            </div>
            <div className="card cardey mb-4">
                <div className="card-header">
                    <i className="fa fa-table me-1"></i>
                    Session Description
                </div>
                <div className="card-body">
                   <AdataSess data={datas}/>
                </div>
            </div>
        </>
        )
}
export default Codata;