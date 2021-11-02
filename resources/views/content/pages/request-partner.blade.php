@extends('layouts/contentLayoutMaster')

@section('title', 'Request Partner') 

@section('vendor-style')
  {{-- vendor css files --}}
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/dataTables.bootstrap4.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/responsive.bootstrap4.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/buttons.bootstrap4.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/rowGroup.bootstrap4.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/pickers/flatpickr/flatpickr.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/animate/animate.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/extensions/sweetalert2.min.css')) }}">
@endsection

@section('page-style')
  <link rel="stylesheet" href="{{asset(mix('css/base/plugins/extensions/ext-component-sweet-alerts.css'))}}">
@endsection

@section('content')

<!-- Basic table -->
<section id="basic-datatable">
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Partner List</h4>
        </div>
        <div class="card-body">
          <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pending-tab"
                  data-toggle="tab"
                  href="#pending"
                  aria-controls="pending"
                  role="tab"
                  aria-selected="true"
                  >Pending</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="approved-tab"
                  data-toggle="tab"
                  href="#approved"
                  aria-controls="approved"
                  role="tab"
                  aria-selected="false"
                  >Approved</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="declined-tab"
                  data-toggle="tab"
                  href="#declined"
                  aria-controls="declined"
                  role="tab"
                  aria-selected="false"
                  >Declined</a
                >
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="pending" aria-labelledby="pending-tab" role="tabpanel">
                <table class="datatables-basic partnerTable table">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th>id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact No.</th>
                      <th>Email Verified</th>
                      <th class="text-center">Action</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="tab-pane" id="approved" aria-labelledby="approved-tab" role="tabpanel">
                <table class="datatables-basic-approved table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact No.</th>
                      <th>Email Verified</th>
                    
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="tab-pane" id="declined" aria-labelledby="declined-tab" role="tabpanel">
                <table class="datatables-basic-declined table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact No.</th>
                      <th>Email Verified</th>
                   
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- Edit modal -->
	<div class="modal" id="modalPartner">
		<div class="modal-dialog modal-dialog-centered  modal-lg" role="document">
			<div class="modal-content modal-content-demo">
				<div class="modal-header">
					<h6 class="modal-title">Approval</h6><button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="modal-body">
					<form method="POST" id="form_approval" autocomplete="nope">
						<div class="">
							<div class="row row-sm">
								<div class="col-lg">
									<div class="form-group">
										<label for="fullname">Fullname</label>
										<input type="hidden" name="partner_id" class="form-control" id="partner_id" autocomplete="nope" required>
                    <input type="hidden" name="action" class="form-control" id="action" autocomplete="nope" required>
										<input type="text" name="fullname" class="form-control" id="fullname" readonly autocomplete="off" required>
									</div>
                  <div class="form-group">
										<label for="email">Email</label>
										<input type="text" name="email" class="form-control" id="email" readonly autocomplete="off" required>
									</div>
                  <div class="form-group">
										<label for="contact_no">Contact No.</label>
										<input type="text" name="contact_no" class="form-control" id="contact_no" readonly autocomplete="off" required>
									</div>
								</div>
							
							</div>
							
						</div>
					</div>
					<div class="modal-footer">
            
						<button type="submit" id="btn-approval" class="btn ripple btn-primary"  >Approve</button>
            <button class="btn ripple btn-secondary" id="btnClose2" data-dismiss="modal" type="button">Cancel</button>          
					</div>
          </form>
			</div>
		</div>
	</div>
	<!-- End Edit modal -->
  
</section>
<!--/ Basic table -->

@endsection


@section('vendor-script')
  {{-- vendor files --}}
  <script src="{{ asset(mix('vendors/js/tables/datatable/jquery.dataTables.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/datatables.bootstrap4.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.responsive.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/responsive.bootstrap4.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/datatables.checkboxes.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/datatables.buttons.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/jszip.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/vfs_fonts.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/buttons.html5.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/buttons.print.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.rowGroup.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/pickers/flatpickr/flatpickr.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/polyfill.min.js')) }}"></script>
@endsection
@section('page-script')
  {{-- Page js files --}}
  <script src="{{asset('js/scripts/components/components-navs.js')}}"></script>
  <script src="{{ asset(mix('js/scripts/request-partner/request-partner-crud.js')) }}"></script>
  
@endsection
