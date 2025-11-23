<?php

namespace App\Repositories;

use App\Models\OrderDetail;

class OrderDetailRepository
{
    public function create(array $data)
    {
        return OrderDetail::create($data);
    }
}
