(function (window, document, $) {
    'use strict';

    let content_picture_url = "";
    let partner = 0;
    let booker = 0;
    let featured = 0;

    var dateTimePickr = $('.flatpickr-date-time')

    if (dateTimePickr.length) {
        dateTimePickr.flatpickr({
          enableTime: true
        });
        
    }

    $("#profileDisplay").on('click', function(){
        document.querySelector('#profileImage').click();
    });

    
    function displayImage(e) {
        if (e.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e){
            document.querySelector('#profileDisplay').setAttribute('src', e.target.result);
            content_picture_url = e.target.result;
          }
          reader.readAsDataURL(e.files[0]);
        }
    }

    $("#partner").on('change', function(){
        if ($(this).is(':checked'))
          partner = 1;
    });

    $("#booker").on('change', function(){
        if ($(this).is(':checked'))
          booker = 1;
    });

    $("#featured").on('change', function(){
        if ($(this).is(':checked'))
          featured = 1;
    });

    $("#profileImage").on('change', function () {
        displayImage(this);
    });

    $('#publish').on('click', function () {
        
        CreateContent();
       
    });

    // AJAX FOR CREATING PERSON
    function CreateContent() {

        let data = {
        "schedule": $('#schedule').val(),
        "content_picture": content_picture_url,
        "partner": partner,
        "booker": booker,
        "featured": featured
        };

        $.ajax({
            type: "POST",
            url: '/create-content-api',
            dataType: 'json',
            data: data,
            async: true,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function (data) {
                if(data == "created"){
               
                    Swal.fire({
                        title: 'Success',
                        text: 'Created',
                        icon: 'success',
                        showConfirmButton: false
                    });

                    setTimeout(function () {
                        window.location.href = "content-management";
                    }, 2000);
                }
      
            }
          });

    }



})(window, document, jQuery);