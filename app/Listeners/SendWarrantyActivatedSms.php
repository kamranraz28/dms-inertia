<?php

namespace App\Listeners;

use App\Events\WarrantyActivated;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class SendWarrantyActivatedSms
{
    protected $apiUrl;
    protected $apiKey;
    protected $senderId;

    public function __construct()
    {
        // Assign env values here once so they are loaded correctly
        $this->apiUrl = env('SMS_API_URL', 'http://bulksmsbd.net/api/smsapi'); // fallback URL
        $this->apiKey = env('SMS_API_KEY', 'default_api_key');
        $this->senderId = env('SMS_SENDER_ID', 'default_senderid');
    }

    public function handle(WarrantyActivated $event)
    {
        //Log::info('WarrantyActivated event triggered for phone: ' . $event->phone);

        $stock = $event->stock;
        $phone = $event->phone;
        $name = $event->customerName;

        $activationDate = Carbon::now()->format('Y-m-d');
        $warrantyPeriodDays = $stock->warranty ?? 0;
        $lastDate = Carbon::now()->addDays($warrantyPeriodDays)->format('Y-m-d');

        $message = "Dear {$name}, your warranty is now active for your device:\n" .
            "Brand: {$stock->product->brand->name}\n" .
            "Product Model: {$stock->product->model}\n" .
            "IMEI-1: {$stock->imei1}\n" .
            "IMEI-2: {$stock->imei2}\n" .
            "Warranty Period: {$warrantyPeriodDays} days\n" .
            "Activation Date: {$activationDate}\n" .
            "Warranty Valid Until: {$lastDate}";

        Http::get($this->apiUrl, [
            'api_key' => $this->apiKey,
            'senderid' => $this->senderId,
            'number' => $phone,
            'message' => $message,
        ]);
    }


}
