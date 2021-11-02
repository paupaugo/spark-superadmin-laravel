<?php

namespace App\Repositories;

use App\Models\RequestPartner;
use App\Repositories\IPartnerRepository;
use Illuminate\Support\Facades\Hash;

class PartnerRepository implements IPartnerRepository
{
    protected $partner = null;

    public function getAllPartners($limit, $start, $order, $dir, $draw, $search, $status)
    {
        if(is_null($status)) {  
                $columns = array( 
                    0 =>'owner_id', 
                    1 =>'full_name',
                    2=> 'owner_email',
                    3=> 'owner_contact_no',
                    4=> 'owner_contact_no',
                    5=> 'salary',
                    6=> 'salary',
                    8=> 'salary',
                );
        }
        else {
            $columns = array( 
                0 =>'owner_id', 
                1 =>'full_name',
                2=> 'owner_email',
                3=> 'owner_contact_no',
                4=> 'owner_contact_no',
                5=> 'owner_contact_no',
                6=> 'owner_contact_no',
               
            );
        }

        $order_col = $columns[$order];
        $totalData = RequestPartner::count();

        $totalFiltered = $totalData; 

        
        
        if(is_null($search))
        {  
            if(is_null($status)) {       
                $posts = RequestPartner::offset($start)
                        ->limit($limit)
                        ->orderBy($order_col,$dir)
                        ->get();
            }
            else if($status == 1){
                $posts = RequestPartner::where('owner_approval_status','=',1)
                        ->offset($start)
                        ->limit($limit)
                        ->orderBy($order_col,$dir)
                        ->get();
            }
            else {
                $posts = RequestPartner::where('owner_approval_status','=',0)
                        ->offset($start)
                        ->limit($limit)
                        ->orderBy($order_col,$dir)
                        ->get();
            }
        }
        else {
            if(is_null($status)) {  

                $posts =  RequestPartner::where('owner_id','LIKE',"%{$search}%")
                            ->orWhere('owner_firstname', 'LIKE',"%{$search}%")
                            ->offset($start)
                            ->limit($limit)
                            ->orderBy($order_col,$dir)
                            ->get();

                $totalFiltered = RequestPartner::where('owner_id','LIKE',"%{$search}%")
                            ->orWhere('owner_firstname', 'LIKE',"%{$search}%")
                            ->count();
            }
            else if($status == 1){
                $posts =  RequestPartner::where('owner_approval_status','=',1)
                            ->where(function($query) use ($search) {
                                $query->where('owner_id', 'LIKE', "%$search%")
                                    ->orWhere('owner_firstname', 'LIKE', "%$search%");
                            })
                            ->offset($start)
                            ->limit($limit)
                            ->orderBy($order_col,$dir)
                            ->get();

                $totalFiltered = RequestPartner::where('owner_approval_status','=',1)
                            ->where(function($query) use ($search) {
                                $query->where('owner_id', 'LIKE', "%$search%")
                                    ->orWhere('owner_firstname', 'LIKE', "%$search%");
                            })
                            ->count();
            }
            else {
                $posts =  RequestPartner::where('owner_approval_status','=',0)
                            ->where(function($query) use ($search) {
                                $query->where('owner_id', 'LIKE', "%$search%")
                                    ->orWhere('owner_firstname', 'LIKE', "%$search%");
                            })
                            ->offset($start)
                            ->limit($limit)
                            ->orderBy($order_col,$dir)
                            ->get();

                $totalFiltered = RequestPartner::where('owner_approval_status','=',0)
                            ->where(function($query) use ($search) {
                                $query->where('owner_id', 'LIKE', "%$search%")
                                    ->orWhere('owner_firstname', 'LIKE', "%$search%");
                            })
                            ->count();
            }
        }

        $data = array();
        if(!empty($posts))
        {
        foreach ($posts as $post)
        {
        // $show =  route('posts.show',$post->id);
        // $edit =  route('posts.edit',$post->id);


        $nestedData['responsive_id'] = "";
        $nestedData['id'] = $post->owner_id;
        $nestedData['full_name'] = $post->owner_firstname." ".$post->owner_lastname;
        $nestedData['email'] = $post->owner_email;
        $nestedData['owner_contact_no'] =  $post->owner_contact_no;
        $nestedData['status'] = $post->owner_status;
        if($post->owner_status == "PENDING"){
            $nestedData['options'] = "<center><button type='button' id='".$post->owner_id."' class='btn ripple btn-primary approve'  data-toggle='tooltip' data-placement='top' title='Approve' disabled>Approve</button>
            <button type='button' id='".$post->owner_id."' class='btn ripple btn-danger decline'  data-toggle='tooltip' data-placement='top' title='Decline' disabled>Decline</button></center>";
        }
        else {
            $nestedData['options'] = "<center><button type='button' id='".$post->owner_id."' class='btn ripple btn-primary approve'  data-toggle='tooltip' data-placement='top' title='Approve'>Approve</button>
            <button type='button' id='".$post->owner_id."' class='btn ripple btn-danger decline'  data-toggle='tooltip' data-placement='top' title='Decline'>Decline</button></center>";
        }
        $data[] = $nestedData;

        }
        }

        $json_data = array(
            "draw"            => intval($draw),  
            "recordsTotal"    => intval($totalData),  
            "recordsFiltered" => intval($totalFiltered), 
            "data"            => $data   
            );

        return json_encode($json_data); 
    }

    public function getPartnerById($partner_id)
    {
        return RequestPartner::find($partner_id);
    }

    public function createOrUpdate($partner_id, $action)
    {   
        if(is_null($partner_id)) {
            // $partnerpartner = new RequestPartner;
            // $user->name = $collection['name'];
            // $user->email = $collection['email'];
            // $user->password = Hash::make('password');
            // return $user->save();
        }
        $partner = RequestPartner::find($partner_id);
        if($action == 'approve'){
            $partner->owner_approval_status = 1;
            $is_saved = $partner->save();
            if ($is_saved) {
                // success
                return "approved";
            } 
            else {
                // failure 
                return "failed";
            }
        }
        else {
            $partner->owner_approval_status = 0;
            $is_saved = $partner->save();
            if ($is_saved) {
                // success
                return "declined";
            } 
            else {
                // failure 
                return "failed";
            }
        }

        
       
    }
    
    public function deleteUser($id)
    {
        return RequestPartner::find($id)->delete();
    }
}
