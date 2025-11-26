<?php

namespace App\Repositories;

use App\Models\Tersale;

class TertiaryRepository
{
    public function allTertiaries()
    {
        return Tersale::with('stock.product', 'user')->get();
    }
}
