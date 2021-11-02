@extends('layouts/contentLayoutMaster')

@section('title', 'Create Content') 

@section('vendor-style')
    {{-- vendor css files --}}
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/pickers/pickadate/pickadate.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/pickers/flatpickr/flatpickr.min.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/animate/animate.min.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/extensions/sweetalert2.min.css')) }}">
@endsection

@section('page-style')
    <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/pickers/form-flat-pickr.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/pickers/form-pickadate.css')) }}">
    <link rel="stylesheet" href="{{asset(mix('css/base/plugins/extensions/ext-component-sweet-alerts.css'))}}">
@endsection

@section('content')

<!-- Basic table -->
<section id="create-content">
  <div class="row">
    <div class="col-12">
        <div class="card pt-3 px-3 pb-3">
        
                <div class="row">
                    <div class="col-6 col-md-6 form-group">
                        <label for="fp-date-time"><b>Scheduled date & time to publish</b></label>
                        <input
                            type="text"
                            id="schedule"
                            class="form-control flatpickr-date-time"
                            placeholder="YYYY-MM-DD HH:MM"
                        />
                        <div class="mt-2">
                            <label for="fp-date-time"><b>Audience</b></label>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="partner" />
                                <label class="custom-control-label" for="partner">Partner</label>  
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="booker"  />
                                <label class="custom-control-label" for="booker">Booker</label>
                            </div>
                        </div>
                        <div class="mt-2">
                            <label for="fp-date-time"><b>Featured</b></label>
                            <div class="row">
                                <div class="col-11">
                                    <p>Click "Featured" to display the banner on Homepage</p>
                                </div>
                                <div class="col-1">
                                    <div class="custom-control custom-checkbox ">
                                        <input type="checkbox" class="custom-control-input float-end" id="featured" />
                                        <label class="custom-control-label" for="featured"></label>  
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-6 col-md-6">
                        <span class="img-div">
                            <div class="text-center img-placeholder"  onClick="triggerClick()">
                                <h4>Update image</h4>
                            </div>
                            <img src="images/avatar.jpg"  id="profileDisplay">
                        </span>
                        <input type="file" name="profileImage"  id="profileImage" class="form-control" style="display: none;">
                        <div class="form-group mt-2 btn-group float-right">
                            <button  name="save_profile" class="btn btn-outline-primary mr-2">SAVE AS DRAFT</button>
                            <button  name="publish" id="publish" class="btn btn-primary">PUBLISH POST</button>
                        </div>
                    </div>
                    
                </div>
           
        </div>
    </div>
  </div>
  
</section>
<!--/ Basic table -->

@endsection


@section('vendor-script')
  {{-- vendor files --}}
  <script src="{{ asset(mix('vendors/js/pickers/pickadate/picker.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/pickers/pickadate/picker.date.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/pickers/pickadate/picker.time.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/pickers/pickadate/legacy.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/pickers/flatpickr/flatpickr.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/polyfill.min.js')) }}"></script>
@endsection
@section('page-script')
  {{-- Page js files --}}
  <script src="{{ asset(mix('js/scripts/content-management/content-management-function.js')) }}"></script>
  
@endsection
