<?php

namespace App\Repositories;

use App\Models\ContentManagement;
use App\Repositories\IContentManagementRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;


class ContentManagementRepository implements IContentManagementRepository
{
    protected $content = null;

    public function getAllContent($limit, $start, $order, $dir, $draw, $search, $status)
    {
        
                $columns = array( 
                    0 =>'content_photo', 
                    1 =>'content_schedule',
                    2=> 'content_is_featured',
                    3=> 'content_status',
                    4=> 'content_action',
                );
        

        $order_col = $columns[$order];
        $totalData = ContentManagement::count();

        $totalFiltered = $totalData; 

        
        
        if(is_null($search))
        {        
                $posts = ContentManagement::offset($start)
                        ->limit($limit)
                        ->orderBy($order_col,$dir)
                        ->get();
           
        }
        else {
            if(is_null($status)) {  

                $posts =  ContentManagement::where('content_id','LIKE',"%{$search}%")
                            ->orWhere('content_schedule', 'LIKE',"%{$search}%")
                            ->offset($start)
                            ->limit($limit)
                            ->orderBy($order_col,$dir)
                            ->get();

                $totalFiltered = ContentManagement::where('content_id','LIKE',"%{$search}%")
                            ->orWhere('content_schedule', 'LIKE',"%{$search}%")
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


      
        $nestedData['id'] = $post->content_id;
        $nestedData['photo'] = "<img src='../storage/".$post->content_photo."' height='50'  width='50' />";
        $nestedData['schedule'] = $post->content_schedule;
        $nestedData['featured'] =  $post->content_is_featured;
        $nestedData['status'] = $post->content_for_partner;
        
            $nestedData['options'] = "<center><button type='button' id='".$post->content_id."' class='btn ripple btn-primary approve'  data-toggle='tooltip' data-placement='top' title='Approve' disabled>Edit</button>
            <button type='button' id='".$post->content_id."' class='btn ripple btn-danger decline'  data-toggle='tooltip' data-placement='top' title='Decline' disabled>Delete</button></center>";
        
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

    public function getContentById($content_id)
    {
        // return RequestPartner::find($partner_id);
    }

    public function createOrUpdateContent($content_id = null, $collection = [])
    {   
        if(is_null($content_id)) {
            $imageName = "";
            $image = $collection['content_picture'];
            $split = explode( '/', $image );
            $type = $split[1];
            $split2 = explode( ';', $type );
            $type2 = $split2[0];
            if($type2 == "jpeg"){
                  //sanitize the base-64 jpeg from data 
                $image = str_replace('data:image/jpeg;base64,', '', $image);
            }
            else {
                //sanitize the base-64 png from data
                $image = str_replace('data:image/png;base64,', '', $image);    
            }
            $image = str_replace(' ', '+', $image);
            //custom name for image
            $imageName = 'content-'.time().'.png';
            //store image to public storage
            Storage::disk('public')->put($imageName, base64_decode($image)); 

            $content = new ContentManagement;
            $content->content_schedule = $collection['schedule'];
            $content->content_for_partner = $collection['partner'];
            $content->content_for_booker = $collection['booker'];
            $content->content_is_featured = $collection['featured'];
            $content->content_photo = $imageName;
            $content->content_type = 1;
            
            $content->save();
       
            return "created";
        }
        // $partner = RequestPartner::find($partner_id);
        // if($action == 'approve'){
        //     $partner->owner_approval_status = 1;
        //     $is_saved = $partner->save();
        //     if ($is_saved) {
        //         // success
        //         return "approved";
        //     } 
        //     else {
        //         // failure 
        //         return "failed";
        //     }
        // }
        // else {
        //     $partner->owner_approval_status = 0;
        //     $is_saved = $partner->save();
        //     if ($is_saved) {
        //         // success
        //         return "declined";
        //     } 
        //     else {
        //         // failure 
        //         return "failed";
        //     }
        // }

        
       
    }
    
    public function deleteContent($content_id)
    {
        // return RequestPartner::find($id)->delete();
    }
}
