<?php

namespace App\Repositories;



interface IContentManagementRepository 
{
    public function getAllContent($limit, $start, $order, $dir, $draw, $search, $status);

    public function getContentById($content_id);

    public function createOrUpdateContent($content_id = null, $collection = []);

    public function deleteContent($content_id);
}
