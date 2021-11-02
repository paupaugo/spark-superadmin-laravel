<?php

namespace App\Repositories;


interface IPartnerRepository 
{
    public function getAllPartners($limit, $start, $order, $dir, $draw, $search, $status);

    public function getPartnerById($partner_id);

    public function createOrUpdate( $partner_id, $action);

    public function deleteUser($id);
}
