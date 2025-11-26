<?php

namespace App\Http\Requests\Sale;

use Illuminate\Foundation\Http\FormRequest;

class StoreStockRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'product_id' => 'required|exists:products,id',
            'stocks' => 'required|array|min:1',
            'stocks.*.imei1' => 'required|string',
            'stocks.*.imei2' => 'required|string',
            'stocks.*.warranty' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'product_id.required' => 'Product is required.',
            'product_id.exists' => 'Selected product does not exist.',
            'stocks.required' => 'Stocks data is required.',
            'stocks.array' => 'Stocks must be an array.',
            'stocks.min' => 'At least one stock entry is required.',
            'stocks.*.imei1.required' => 'IMEI 1 is required for each stock entry.',
            'stocks.*.imei2.required' => 'IMEI 2 is required for each stock entry.',
            'stocks.*.warranty.required' => 'Warranty information is required for each stock entry.',
        ];
    }
}
