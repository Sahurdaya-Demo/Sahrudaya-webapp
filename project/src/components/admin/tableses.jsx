
import jszip from 'jszip';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import axios from 'axios';
import { LinkApi } from '../Utils/Resource';
import 'datatables.net-responsive-bs5';
const AdataSess = ({ data=[] }) => {
    const handleShow = () => setShow(true);
    const handleClose = () => {setShow(false);setDisableButton(false);}
    const [show, setShow] = useState(false);
    const[uid,setuid]=useState('')
    const[id,setid]=useState('')
    const[name,setname]=useState('')
    const [date,setdate]=useState(new Date())
    const [sessdesc,setsessdec]=useState('')
    const [disableButton,setDisableButton] = useState(false)
    window.JSZip = jszip;
    const tableRef = useRef(null);
    useEffect(() => {
        if (!tableRef.current || !Array.isArray(data) || data.length === 0) return;
        // console.log($(tableRef.current).data)
        // $(tableRef.current).DataTable().
        
      const dataTable = $(tableRef.current).DataTable({
        data,
        columns: [
          {title:'UID',data:'uniqueid',className:'text-start'},
          { title: 'Name', data: 'name' },
          { title: 'Date', data: 'date' ,className:'text-start'},
          { title: 'Session Desc.', data: 'sessiondesc' ,className:'text-start'},
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
          setid(rowData.id)
          setdate(rowData.date)
          setname(rowData.name)
          setsessdec(rowData.sessiondesc)
          setuid(rowData.uniqueid)
          handleShow()
          // editRow(rowData.id);
          
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
    }, [data]);

    const delrecord=async(id)=>{
        if (window.confirm('Are you sure you wish to delete this item?')){
        try{
        await axios({
            method: 'delete',
            url:`${LinkApi}crudsession/${id}/`,
          }).then(response=>{
            window.location.reload();
          }
          )}
          catch{}
        }
      
      }
    return (
        <>
        {/* <link rel='stylesheet'type='text/css' href='https://cdn.datatables.net/v/bs5/jszip-3.10.1/dt-2.0.2/b-3.0.1/b-html5-3.0.1/b-print-3.0.1/datatables.min.css'></link> */}
      <div>
        <table ref={tableRef} className="table table-striped display responsive" width="100%" id='counsel'>
          <thead>
          <tr>
                    <th></th>
                    <th className='d-flex justify-content-center'>No data</th>
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
                    </tr>
           </tfoot>
        </table>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:"#75E3B9",opacity:".7",border:'none'}}>
            <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
            <Modal.Body className='p-2'style={{backgroundColor:"#75E3B9",opacity:".7"}}>
                 
              <Form.Group controlId="uid">
                <Form.Label>UID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={uid||''}
                    onChange={(e) => setuid(e.target.value)}
                    disabled
                    autoFocus
                    />                              
              </Form.Group>       
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={name||''}
                    onChange={(e) => setname(e.target.value)}
                    disabled
                    autoFocus
                    />                              
              </Form.Group> 
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
              <Form.Group controlId="sessdesc">
                <Form.Label>Session Description</Form.Label>
                  <Form.Control
                     as={"textarea"}
                     rows={3}  
                     maxLength={200} 
                    value={sessdesc||''}
                    onChange={(e) => setsessdec(e.target.value)}
                    disabled={!disableButton}
                    autoFocus
                    />                              
              </Form.Group>  
              <Form.Group className="d-flex justify-content-end align-content-end">
                  <Button variant="btn btn-danger py-1 m-1" onClick={handleClose}>Close</Button>
               </Form.Group>                                                            
              </Modal.Body>             
      </Modal>
      </>
    )

}

export default AdataSess;