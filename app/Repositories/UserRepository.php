<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function getAllUser()
    {
        return User::all();
    }
    public function dealers()
    {
        return User::role('Dealer')->get();
    }
    public function retailers()
    {
        return User::role('Retailer')->get();
    }
}
