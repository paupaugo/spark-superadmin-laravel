/**
 * DataTables Basic
 */

 $(function () {
    'use strict';
  
    var dt_basic_table = $('.datatables-content'),
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
            url: "/all-content-api",
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
            // used for sorting so will hide this column
          { data: 'photo' },
          { data: 'schedule' },
          { data: 'featured' },
          { data: 'status' },
          { data: 'options' }
        ],
        columnDefs: [
         
          {
         
            targets: 0,
            orderable: false,
            
          },
          
         
          {
            // Label
            targets: 2,
            render: function (data, type, full, meta) {
              var $status_number = full['featured'];
              var $status = {
                1: { title: 'Featured', class: 'badge-light-primary' },
                0: { title: '', class: '' }
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
          '<"card-header justify-content-left border-bottom p-1"<"head-label"><"dt-action-buttons text-right"B>><"d-flex  justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between   mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        displayLength: 10,
        lengthMenu: [10, 25, 50, 75, 100],
        buttons: [
            {
                text: feather.icons['plus'].toSvg({ class: 'mr-50 font-small-4' }) + 'Add News',
                className: 'create-new btn btn-primary mr-2',
                action: function ( e, dt, button, config ) {
                    window.location = 'create-content';
                  },       
                init: function (api, node, config) {
                  $(node).removeClass('btn-secondary');
                }
            }
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
  