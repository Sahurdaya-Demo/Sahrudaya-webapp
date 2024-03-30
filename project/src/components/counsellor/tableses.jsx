import LoadExternalScript from '../../LoadExternalScript';
import jszip from 'jszip';
import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
// import pdfmake from 'pdfmake';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
// import view from './Data';
import Patients from './Patients';
import 'datatables.net-responsive-bs5';
const DataSess = ({ data=[] }) => {
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
                  <button class="btn btn-primary edit-btn">Edit</button>
                  <button class="btn btn-danger  delete-btn">Delete</button>
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
        // Add event listeners to the buttons after DataTable initialization
        $(tableRef.current).on('click', '.edit-btn', function () {
          const rowData = dataTable.row($(this).closest('tr')).data();
        //   editRow(rowData.id);
        });

        $(tableRef.current).on('click', '.delete-btn', function () {
          const rowData = dataTable.row($(this).closest('tr')).data();
        //   delrecord(rowData.id);
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
    )

}
export default DataSess;