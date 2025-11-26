<?php

namespace App\Repositories;

use App\Models\Prisale;

class PrimaryRepository
{
    public function allPrimaries()
    {
        return Prisale::with('stock.product', 'user')->get();
    }
}
