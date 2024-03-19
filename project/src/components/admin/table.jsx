import React, { useEffect, useRef } from 'react';
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
const Tbadmin=({data=[]})=>{
    const tableRef = useRef(null);
    useEffect(()=>{
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
            const searchdiv = $(this).closest('#counsel_wrapper').find('.dt-search');
            const searchInput = $(this).closest('#counsel_wrapper').find('input[type="search"]');
            searchInput.addClass('form-control form-control-sm');
            searchdiv.addClass('float-lg-end'); // Add Bootstrap classes to style the input
            searchdiv.css({ display:'flex'});
        },
        });
        return () => {
            $(tableRef.current).DataTable().destroy(true);
          };
    },[data])
    return(
        <>
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
export default Tbadmin;