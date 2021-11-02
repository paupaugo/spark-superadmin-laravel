<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use Twilio\Rest\Client;
use App\Repositories\IPartnerRepository;



class RequestPartnerController extends Controller
{

    public $partner;
    
    public function __construct(IPartnerRepository $partner)
    {
        $this->partner = $partner;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $receiverNumber = "+639750282224";
        $message = "This is testing from spark";
  
        try {
  
            $account_sid = getenv("TWILIO_SID");
            $auth_token = getenv("TWILIO_TOKEN");
            $twilio_number = getenv("TWILIO_FROM");
  
            $client = new Client($account_sid, $auth_token);
            $client->messages->create($receiverNumber, [
                'from' => $twilio_number, 
                'body' => $message]);
  
            dd('SMS Sent Successfully.');
  
        } catch (Exception $e) {
            dd("Error: ". $e->getMessage());
        }
    }

    
    public function partner_list()
    {
        $breadcrumbs = [['link' => "/", 'name' => "Home"], ['link' => "javascript:void(0)", 'name' => "Datatable"], ['name' => "Basic"]];
        return view('/content/pages/request-partner');


    }
    
    public function allPartners(Request $request)
    {
        
        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $request->input('order.0.column');
        $dir = $request->input('order.0.dir');
        $draw = $request->input('draw'); 

        $search = $request->input('search.value');  
        $status = $request->input('status');

        if(empty($search)) {
            $partners = $this->partner->getAllPartners($limit, $start, $order, $dir, $draw, $search=null, $status);
        }
        else {
            $partners = $this->partner->getAllPartners($limit, $start, $order, $dir, $draw, $search, $status);
        }
        return $partners;
    }

    

    public function getPartner($partner_id)
    {
     
        $partner = $this->partner->getPartnerById($partner_id);
        return $partner;
    }

    public function savePartner(Request $request)
    {   
        $partner_id = $request->input('partner_id');
        $action = $request->input('action');

        if( ! is_null( $partner_id ) ) 
        {
            $partners = $this->partner->createOrUpdate($partner_id, $action);
        }
        else
        {
            $partners = $this->partner->createOrUpdate($partner_id = null, $action= null);
        }

        return $partners;
    }
}
