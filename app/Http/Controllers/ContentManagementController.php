<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Repositories\IContentManagementRepository;

class ContentManagementController extends Controller
{
    public $content;
    
    public function __construct(IContentManagementRepository $content)
    {
        $this->content = $content;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function content_list()
    {
        //
        $breadcrumbs = [['link' => "/", 'name' => "Home"], ['link' => "javascript:void(0)", 'name' => "Datatable"], ['name' => "Basic"]];
        return view('/content/pages/content-management');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create_content()
    {
        $breadcrumbs = [['link' => "/content-management", 'name' => "Content Management"], ['link' => "javascript:void(0)", 'name' => "Create Content"]];
        return view('/content/pages/create-content', [
            'breadcrumbs' => $breadcrumbs
        ]);
    }

    public function all_content(Request $request)
    {
        
        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $request->input('order.0.column');
        $dir = $request->input('order.0.dir');
        $draw = $request->input('draw'); 

        $search = $request->input('search.value');  
        $status = $request->input('status');

        if(empty($search)) {
            $contents = $this->content->getAllContent($limit, $start, $order, $dir, $draw, $search=null, $status);
        }
        else {
            $contents = $this->content->getAllContent($limit, $start, $order, $dir, $draw, $search, $status);
        }
        return $contents;
    }

    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store_content(Request $request, $content_id = null )
    {
        $collection = $request->except(['_token','_method']);
        
        if( ! is_null( $content_id ) ) 
        {
            $content_return = $this->content->createOrUpdateContent($content_id, $collection);
        }
        else
        {
            $content_return = $this->content->createOrUpdateContent($content_id = null, $collection);
        }

        return $content_return;
        
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
