import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import '../counsellor/css/datatables.css'
import '../counsellor/css/datatables.min.css'
// import jszip from 'jszip';
// import pdfmake from 'pdfmake';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';

import 'datatables.net-responsive-bs5';
import axios from "axios";
import { LinkApi } from '../Utils/Resource';
import LoadExternalScript from '../../LoadExternalScript';
const DataTableComponent = ({ data=[] }) => {
    const tableRef = useRef(null);
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

    useEffect(() => {
        if (!tableRef.current || !Array.isArray(data) || data.length === 0) return;
      const dataTable = $(tableRef.current).DataTable({
        data,
        columns: [
          { title: 'Name', data: 'name' },
          { title: 'Age', data: 'age' },
          { title: 'Date', data: 'date' },
          { title: 'Place of counselling', data: 'place_of_counselling' },
          { title: 'Email', data: 'email',sortable:false},
          {
            title: 'Actions',
            data: null,
            sortable:false,
            render:function(data, type, row) {
                return `
                <div>
                  <button class="btn btn-primary btn-sm edit-btn">Edit</button>
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
        // Add event listeners to the buttons after DataTable initialization
        $(tableRef.current).on('click', '.edit-btn', function () {
          const rowData = dataTable.row($(this).closest('tr')).data();
          editRow(rowData.id);
        });

        $(tableRef.current).on('click', '.delete-btn', function () {
          const rowData = dataTable.row($(this).closest('tr')).data();
          delrecord(rowData.id);
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
    // Function to handle edit button click
  const editRow = (id) => {
    console.log('Edit row ID:', id);
    // Add your edit logic here, e.g., open a modal for editing
  };

  // Function to handle delete button click
  const deleteRow = (id) => {
    console.log('Delete row ID:', id);
    // Add your delete logic here, e.g., show a confirmation modal
  };
     
   
    return (
        <>
        {/* <link rel='stylesheet'type='text/css' href='https://cdn.datatables.net/v/bs5/jszip-3.10.1/dt-2.0.2/b-3.0.1/b-html5-3.0.1/b-print-3.0.1/datatables.min.css'></link> */}
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
      </>
    );
  };
  
  export default DataTableComponent;