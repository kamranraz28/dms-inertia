<?php

namespace App\Http\Requests\Sale;

use Illuminate\Foundation\Http\FormRequest;

class StoreTertiarySaleRequest extends FormRequest
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
            'imei' => 'required|string',
            'customer_name' => 'required|string',
            'customer_phone' => 'required|string',
            'customer_address' => 'required|string',
            'remarks' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'imei.required' => 'The IMEI field is required.',
            'customer_name.required' => 'The customer name field is required.',
            'customer_phone.required' => 'The customer phone field is required.',
            'customer_address.required' => 'The customer address field is required.',
        ];
    }
}
