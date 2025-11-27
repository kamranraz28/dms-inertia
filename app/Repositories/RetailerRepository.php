<?php

namespace App\Repositories;

use App\Models\Retailer;

class RetailerRepository
{
    public function getDealerIdByRetailerId($retailerId)
    {
        return Retailer::where('retailer_id', $retailerId)
            ->first()
            ?->dealer_id;
    }
}
