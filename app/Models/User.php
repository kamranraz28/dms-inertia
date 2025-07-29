<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'photo',
        'office_id',
        'phone',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    public function prisales()
    {
        return $this->hasMany(Prisale::class);
    }
    public function retailers()
    {
        return $this->hasMany(Retailer::class, 'retailer_id');
    }
    public function dealers()
    {
        return $this->hasMany(Retailer::class, 'dealer_id');
    }
    public function secSalesDealer()
    {
        return $this->hasMany(Secsale::class, 'dealer_id');
    }
    public function secSalesRetailer()
    {
        return $this->hasMany(Secsale::class, 'retailer_id');
    }
    public function tersales()
    {
        return $this->hasMany(Tersale::class);
    }



}
