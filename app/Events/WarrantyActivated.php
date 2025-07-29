<?php

namespace App\Events;

use App\Models\Stock;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class WarrantyActivated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $stock;
    public $phone;
    public $customerName;

    /**
     * Create a new event instance.
     */
    public function __construct(Stock $stock, string $phone, string $customerName)
    {
        $this->stock = $stock;
        $this->phone = $phone;
        $this->customerName = $customerName;
    }

}
