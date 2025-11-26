<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockVerificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'verified' => true,
            'product' => [
                'name' => $this->product->name,
                'model' => $this->product->model,
                'color' => $this->product->color,
                'dp' => $this->product->dp,
                'brand' => $this->product->brand->name ?? '-',
                'category' => $this->product->cat->name ?? '-',
                'stocked_at' => $this->created_at->toDateTimeString(),
            ]
        ];
    }
}
