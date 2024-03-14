$(document).ready(function() {
    $('#counsel').DataTable({
      //disable sorting on last column
      "columnDefs": [
        { "orderable": false, "targets": 6},
        { "targets": [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22], "visible": false }
      ],
      dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel', 'print'
      ],
      "bDestroy": true,
      language: {
        //customize pagination prev and next buttons: use arrows instead of words
        'paginate': {
          'previous': '<span class="fa fa-chevron-left"></span>',
          'next': '<span class="fa fa-chevron-right"></span>'
        },
        //customize number of elements to be displayed
        "lengthMenu": 'Display <select class="form-control input-sm">'+
        '<option value="10">10</option>'+
        '<option value="20">20</option>'+
        '<option value="30">30</option>'+
        '<option value="40">40</option>'+
        '<option value="50">50</option>'+
        '<option value="-1">All</option>'+
        '</select> results'
      },
      
    })  
  } );