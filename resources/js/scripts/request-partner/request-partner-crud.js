/**
 * DataTables Basic
 */

 $(function () {
    'use strict';
  
    var dt_basic_table = $('.datatables-basic'),
    dt_basic_table_approved = $('.datatables-basic-approved'),
    dt_basic_table_declined = $('.datatables-basic-declined'),
      assetPath = '../../../app-assets/';
  
    if ($('body').attr('data-framework') === 'laravel') {
      assetPath = $('body').attr('data-asset-path');
    }
  
    // DataTable with buttons
    // --------------------------------------------------------------------
  
    if (dt_basic_table.length) {
      var dt_basic = dt_basic_table.DataTable({
        drawCallback: function( settings ) {
          feather.replace();
        },
        processing: true,
        serverSide: true,
        ajax: {
            url: "/allpartners",
            dataType: "json",
            type: "POST",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            dataSrc: "data",
            data: function(data) { 
              var status = null;
               // Append to data
              data.status = status;
            }
        },
        columns: [
          { data: 'responsive_id' },
          { data: 'id' },
          { data: 'id' }, // used for sorting so will hide this column
          { data: 'full_name' },
          { data: 'email' },
          { data: 'owner_contact_no' },
          { data: '' },
          { data: 'options' }
        ],
        columnDefs: [
          {
            // For Responsive
            className: 'control',
            orderable: false,
            responsivePriority: 2,
            targets: 0
          },
          {
            // For Checkboxes
            targets: 1,
            orderable: false,
            responsivePriority: 3,
            render: function (data, type, full, meta) {
              return (
                '<div class="custom-control custom-checkbox"> <input class="custom-control-input dt-checkboxes" type="checkbox" value="" id="checkbox' +
                data +
                '" /><label class="custom-control-label" for="checkbox' +
                data +
                '"></label></div>'
              );
            },
            checkboxes: {
              selectAllRender:
                '<div class="custom-control custom-checkbox"> <input class="custom-control-input" type="checkbox" value="" id="checkboxSelectAll" /><label class="custom-control-label" for="checkboxSelectAll"></label></div>'
            }
          },
          {
            targets: 2,
            visible: false
          },
          {
            // Avatar image/badge, Name and post
            targets: 3,
            responsivePriority: 4,
            render: function (data, type, full, meta) {
              var $user_img = full['avatar'],
                $name = full['full_name'];
              if ($user_img) {
                // For Avatar image
                var $output =
                  '<img src="' + assetPath + 'images/avatars/' + $user_img + '" alt="Avatar" width="32" height="32">';
              } else {
                // For Avatar badge
                var stateNum = full['status'];
                var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
                var $state = states[stateNum],
                  $name = full['full_name'],
                  $initials = $name.match(/\b\w/g) || [];
                $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
                $output = '<span class="avatar-content">' + $initials + '</span>';
              }
  
              var colorClass = $user_img === '' ? ' bg-light-' + $state + ' ' : '';
              // Creates full output for row
              var $row_output =
                '<div class="d-flex justify-content-left align-items-center">' +
                '<div class="avatar ' +
                colorClass +
                ' mr-1">' +
                $output +
                '</div>' +
                '<div class="d-flex flex-column">' +
                '<span class="emp_name text-truncate font-weight-bold">' +
                $name +
                '</span>' +
                '</div>' +
                '</div>';
              return $row_output;
            }
          },
          {
            responsivePriority: 1,
            targets: 4
          },
          {
            // Label
            targets: -2,
            render: function (data, type, full, meta) {
              var $status_number = full['status'];
              var $status = {
                'CONFIRMED': { title: 'Confirmed', class: 'badge-light-primary' },
                2: { title: 'Professional', class: ' badge-light-success' },
                'PENDING': { title: 'Pending', class: ' badge-light-danger' },
                4: { title: 'Resigned', class: ' badge-light-warning' },
                5: { title: 'Applied', class: ' badge-light-info' }
              };
              if (typeof $status[$status_number] === 'undefined') {
                return data;
              }
              return (
                '<span class="badge badge-pill ' +
                $status[$status_number].class +
                '">' +
                $status[$status_number].title +
                '</span>'
              );
            }
          }
        ],
        order: [[2, 'desc']],
        dom:
          '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-right"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        displayLength: 10,
        lengthMenu: [10, 25, 50, 75, 100],
        buttons: [
          {
            extend: 'collection',
            className: 'btn btn-outline-secondary dropdown-toggle mr-2',
            text: feather.icons['share'].toSvg({ class: 'font-small-4 mr-50' }) + 'Export',
            buttons: [
              {
                extend: 'print',
                text: feather.icons['printer'].toSvg({ class: 'font-small-4 mr-50' }) + 'Print',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              },
              {
                extend: 'csv',
                text: feather.icons['file-text'].toSvg({ class: 'font-small-4 mr-50' }) + 'Csv',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              },
              {
                extend: 'excel',
                text: feather.icons['file'].toSvg({ class: 'font-small-4 mr-50' }) + 'Excel',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              },
              {
                extend: 'pdf',
                text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 mr-50' }) + 'Pdf',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              },
              {
                extend: 'copy',
                text: feather.icons['copy'].toSvg({ class: 'font-small-4 mr-50' }) + 'Copy',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              }
            ],
            init: function (api, node, config) {
              $(node).removeClass('btn-secondary');
              $(node).parent().removeClass('btn-group');
              setTimeout(function () {
                $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex');
              }, 50);
            }
          },
        ],
        responsive: {
          details: {
            display: $.fn.dataTable.Responsive.display.modal({
              header: function (row) {
                var data = row.data();
                return 'Details of ' + data['full_name'];
              }
            }),
            type: 'column',
            renderer: function (api, rowIdx, columns) {
              var data = $.map(columns, function (col, i) {
                console.log(columns);
                return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                  ? '<tr data-dt-row="' +
                      col.rowIndex +
                      '" data-dt-column="' +
                      col.columnIndex +
                      '">' +
                      '<td>' +
                      col.title +
                      ':' +
                      '</td> ' +
                      '<td>' +
                      col.data +
                      '</td>' +
                      '</tr>'
                  : '';
              }).join('');
  
              return data ? $('<table class="table"/>').append(data) : false;
            }
          }
        },
        language: {
          paginate: {
            // remove previous & next text from pagination
            previous: '&nbsp;',
            next: '&nbsp;'
          }
        }
      });
      $('div.head-label').html('<h6 class="mb-0"></h6>');
    }

    if (dt_basic_table_approved.length) {
      var dt_basic = dt_basic_table_approved.DataTable({
        drawCallback: function( settings ) {
          feather.replace();
        },
        processing: true,
        serverSide: true,
        ajax: {
            url: "/allpartners",
            dataType: "json",
            type: "POST",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            dataSrc: "data",
            data: function(data) { 
              var status = 1;
               // Append to data
              data.status = status;
            }

        },
        columns: [
      
          { data: 'id' },
          { data: 'id' }, // used for sorting so will hide this column
          { data: 'full_name' },
          { data: 'email' },
          { data: 'owner_contact_no' },
          { data: '' },
        
        ],
        columnDefs: [
          
          {
            // For Checkboxes
            targets: 0,
            orderable: false,
            responsivePriority: 2,
            render: function (data, type, full, meta) {
              return (
                '<div class="custom-control custom-checkbox"> <input class="custom-control-input dt-checkboxes" type="checkbox" value="" id="checkbox' +
                data +
                '" /><label class="custom-control-label" for="checkbox' +
                data +
                '"></label></div>'
              );
            },
            checkboxes: {
              selectAllRender:
                '<div class="custom-control custom-checkbox"> <input class="custom-control-input" type="checkbox" value="" id="checkboxSelectAll" /><label class="custom-control-label" for="checkboxSelectAll"></label></div>'
            }
          },
          {
            targets: 1,
            visible: false
          },
          {
            // Avatar image/badge, Name and post
            targets: 2,
            responsivePriority: 3,
            render: function (data, type, full, meta) {
              var $user_img = full['avatar'],
                $name = full['full_name'];
              if ($user_img) {
                // For Avatar image
                var $output =
                  '<img src="' + assetPath + 'images/avatars/' + $user_img + '" alt="Avatar" width="32" height="32">';
              } else {
                // For Avatar badge
                var stateNum = full['status'];
                var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
                var $state = states[stateNum],
                  $name = full['full_name'],
                  $initials = $name.match(/\b\w/g) || [];
                $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
                $output = '<span class="avatar-content">' + $initials + '</span>';
              }
  
              var colorClass = $user_img === '' ? ' bg-light-' + $state + ' ' : '';
              // Creates full output for row
              var $row_output =
                '<div class="d-flex justify-content-left align-items-center">' +
                '<div class="avatar ' +
                colorClass +
                ' mr-1">' +
                $output +
                '</div>' +
                '<div class="d-flex flex-column">' +
                '<span class="emp_name text-truncate font-weight-bold">' +
                $name +
                '</span>' +
                '</div>' +
                '</div>';
              return $row_output;
            }
          },
          {
            responsivePriority: 1,
            targets: 3
          },
          {
            // Label
            targets: -1,
            render: function (data, type, full, meta) {
              var $status_number = full['status'];
              var $status = {
                'CONFIRMED': { title: 'Confirmed', class: 'badge-light-primary' },
                2: { title: 'Professional', class: ' badge-light-success' },
                'PENDING': { title: 'Pending', class: ' badge-light-danger' },
                4: { title: 'Resigned', class: ' badge-light-warning' },
                5: { title: 'Applied', class: ' badge-light-info' }
              };
              if (typeof $status[$status_number] === 'undefined') {
                return data;
              }
              return (
                '<span class="badge badge-pill ' +
                $status[$status_number].class +
                '">' +
                $status[$status_number].title +
                '</span>'
              );
            }
          }
        ],
        order: [[2, 'desc']],
        dom:
          '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-right"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        displayLength: 10,
        lengthMenu: [10, 25, 50, 75, 100],
        buttons: [
          {
            extend: 'collection',
            className: 'btn btn-outline-secondary dropdown-toggle mr-2',
            text: feather.icons['share'].toSvg({ class: 'font-small-4 mr-50' }) + 'Export',
            buttons: [
              {
                extend: 'print',
                text: feather.icons['printer'].toSvg({ class: 'font-small-4 mr-50' }) + 'Print',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              },
              {
                extend: 'csv',
                text: feather.icons['file-text'].toSvg({ class: 'font-small-4 mr-50' }) + 'Csv',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              },
              {
                extend: 'excel',
                text: feather.icons['file'].toSvg({ class: 'font-small-4 mr-50' }) + 'Excel',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              },
              {
                extend: 'pdf',
                text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 mr-50' }) + 'Pdf',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              },
              {
                extend: 'copy',
                text: feather.icons['copy'].toSvg({ class: 'font-small-4 mr-50' }) + 'Copy',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              }
            ],
            init: function (api, node, config) {
              $(node).removeClass('btn-secondary');
              $(node).parent().removeClass('btn-group');
              setTimeout(function () {
                $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex');
              }, 50);
            }
          },
        ],
        language: {
          paginate: {
            // remove previous & next text from pagination
            previous: '&nbsp;',
            next: '&nbsp;'
          }
        }
      });
      $('div.head-label').html('<h6 class="mb-0"></h6>');
    }

    if (dt_basic_table_declined.length) {
      var dt_basic = dt_basic_table_declined.DataTable({
        drawCallback: function( settings ) {
          feather.replace();
        },
        processing: true,
        serverSide: true,
        ajax: {
            url: "/allpartners",
            dataType: "json",
            type: "POST",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            dataSrc: "data",
            data: function(data) { 
              var status = 0;
               // Append to data
              data.status = status;
            }

        },
        columns: [
          { data: 'id' },
          { data: 'id' }, // used for sorting so will hide this column
          { data: 'full_name' },
          { data: 'email' },
          { data: 'owner_contact_no' },
          { data: '' },
         
        ],
        columnDefs: [
         
          {
            // For Checkboxes
            targets: 0,
            orderable: false,
            responsivePriority: 3,
            render: function (data, type, full, meta) {
              return (
                '<div class="custom-control custom-checkbox"> <input class="custom-control-input dt-checkboxes" type="checkbox" value="" id="checkbox' +
                data +
                '" /><label class="custom-control-label" for="checkbox' +
                data +
                '"></label></div>'
              );
            },
            checkboxes: {
              selectAllRender:
                '<div class="custom-control custom-checkbox"> <input class="custom-control-input" type="checkbox" value="" id="checkboxSelectAll" /><label class="custom-control-label" for="checkboxSelectAll"></label></div>'
            }
          },
          {
            targets: 1,
            visible: false
          },
          {
            // Avatar image/badge, Name and post
            targets: 2,
            responsivePriority: 4,
            render: function (data, type, full, meta) {
              var $user_img = full['avatar'],
                $name = full['full_name'];
              if ($user_img) {
                // For Avatar image
                var $output =
                  '<img src="' + assetPath + 'images/avatars/' + $user_img + '" alt="Avatar" width="32" height="32">';
              } else {
                // For Avatar badge
                var stateNum = full['status'];
                var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
                var $state = states[stateNum],
                  $name = full['full_name'],
                  $initials = $name.match(/\b\w/g) || [];
                $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
                $output = '<span class="avatar-content">' + $initials + '</span>';
              }
  
              var colorClass = $user_img === '' ? ' bg-light-' + $state + ' ' : '';
              // Creates full output for row
              var $row_output =
                '<div class="d-flex justify-content-left align-items-center">' +
                '<div class="avatar ' +
                colorClass +
                ' mr-1">' +
                $output +
                '</div>' +
                '<div class="d-flex flex-column">' +
                '<span class="emp_name text-truncate font-weight-bold">' +
                $name +
                '</span>' +
                '</div>' +
                '</div>';
              return $row_output;
            }
          },
          {
            responsivePriority: 1,
            targets: 3
          },
          {
            // Label
            targets: -1,
            render: function (data, type, full, meta) {
              var $status_number = full['status'];
              var $status = {
                'CONFIRMED': { title: 'Confirmed', class: 'badge-light-primary' },
                2: { title: 'Professional', class: ' badge-light-success' },
                'PENDING': { title: 'Pending', class: ' badge-light-danger' },
                4: { title: 'Resigned', class: ' badge-light-warning' },
                5: { title: 'Applied', class: ' badge-light-info' }
              };
              if (typeof $status[$status_number] === 'undefined') {
                return data;
              }
              return (
                '<span class="badge badge-pill ' +
                $status[$status_number].class +
                '">' +
                $status[$status_number].title +
                '</span>'
              );
            }
          }
        ],
        order: [[2, 'desc']],
        dom:
          '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-right"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        displayLength: 10,
        lengthMenu: [10, 25, 50, 75, 100],
        buttons: [
          {
            extend: 'collection',
            className: 'btn btn-outline-secondary dropdown-toggle mr-2',
            text: feather.icons['share'].toSvg({ class: 'font-small-4 mr-50' }) + 'Export',
            buttons: [
              {
                extend: 'print',
                text: feather.icons['printer'].toSvg({ class: 'font-small-4 mr-50' }) + 'Print',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              },
              {
                extend: 'csv',
                text: feather.icons['file-text'].toSvg({ class: 'font-small-4 mr-50' }) + 'Csv',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              },
              {
                extend: 'excel',
                text: feather.icons['file'].toSvg({ class: 'font-small-4 mr-50' }) + 'Excel',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              },
              {
                extend: 'pdf',
                text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 mr-50' }) + 'Pdf',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              },
              {
                extend: 'copy',
                text: feather.icons['copy'].toSvg({ class: 'font-small-4 mr-50' }) + 'Copy',
                className: 'dropdown-item',
                exportOptions: { columns: [3, 4, 5, 6, 7] }
              }
            ],
            init: function (api, node, config) {
              $(node).removeClass('btn-secondary');
              $(node).parent().removeClass('btn-group');
              setTimeout(function () {
                $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex');
              }, 50);
            }
          },
        ],
        language: {
          paginate: {
            // remove previous & next text from pagination
            previous: '&nbsp;',
            next: '&nbsp;'
          }
        }
      });
      $('div.head-label').html('<h6 class="mb-0"></h6>');
    }

    $(".partnerTable").on('click', '.approve', function(){

      var partnerId = $(this).attr("id");
   
      // $('#partner_id').val(partnerId);
      $.ajax({
          url:'getpartner/'+ partnerId,
          method:"GET",
          headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
          success:function(data){
            $("#modalPartner").modal("show");
            $('#btn-approval').text("Approve");
            $('#btn-approval').removeClass('btn-danger');
            $('#btn-approval').addClass('btn-primary');
            $('#partner_id').val(data.owner_id);
            $('#action').val('approve');
            $('#fullname').val(data.owner_firstname+' '+data.owner_lastname);
            $('#email').val(data.owner_email);
            $('#contact_no').val(data.owner_contact_no); 
          }
      })
    });

     $(".partnerTable").on('click', '.decline', function(){

      var partnerId = $(this).attr("id");
   
      // $('#partner_id').val(partnerId);
      $.ajax({
          url:'getpartner/'+ partnerId,
          method:"GET",
          headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
          success:function(data){
            $("#modalPartner").modal("show");
            $('#btn-approval').text("Decline");
            $('#btn-approval').removeClass('btn-primary');
            $('#btn-approval').addClass('btn-danger');
            $('#partner_id').val(data.owner_id);
            $('#action').val('decline');
            $('#fullname').val(data.owner_firstname+' '+data.owner_lastname);
            $('#email').val(data.owner_email);
            $('#contact_no').val(data.owner_contact_no); 
          }
      })
    });

    $("#form_approval").on( "submit", function( event ) {
        var formData = new FormData($(this)[0]);
           
            $.ajax({
                url: 'partner-approval',
                type: 'POST',
                data: formData,
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) 
                {
                    //show return answer
                    if(data == "approved") {
                        $("#btnClose2").trigger("click");
                        Swal.fire({
                            title: 'Success',
                            text: 'Approved',
                            icon: 'success',
                            showConfirmButton: false
                        });
    
                        setTimeout(function () {
                            window.location.href = "request-partner";
                        }, 2000);
                    }
                    else if(data == "declined") {
                        $("#btnClose2").trigger("click");
                        Swal.fire({
                            title: 'Success',
                            text: 'Declined',
                            icon: 'success',
                            showConfirmButton: false
                        });
    
                        setTimeout(function () {
                            window.location.href = "request-partner";
                        }, 2000);
                    }
                    else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Unable to process data.',
                            icon: 'error'
                        });
                      
                    }
                },
                complete : function() {
                // This will run after sending an Ajax complete
                },
                error: function(xhr, status, error){
                    // If any error occurs in request
                    var errorMessage = xhr.status + ': ' + xhr.statusText
                    alert('Error - ' + errorMessage);
                    $("#save-progress").html('Submit');
                    $("#save-progress").attr("disabled", false);
                }
            });
        return false;
    });


  
  
   
  
    
  
  
 
});
  