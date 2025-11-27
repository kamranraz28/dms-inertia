<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReturnProductRequest extends FormRequest
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
            'imeis' => 'required|array|min:1',
            'imeis.*.imei' => 'required|string',
            'remarks' => 'nullable|string',
        ];
    }
    public function messages(): array
    {
        return [
            'imeis.required' => 'Please provide at least one IMEI to return.',
            'imeis.array' => 'The IMEIs must be provided as an array.',
            'imeis.min' => 'Please provide at least one IMEI to return.',
            'imeis.*.imei.required' => 'Each IMEI entry must have an IMEI value.',
            'imeis.*.imei.string' => 'Each IMEI value must be a string.',
            'remarks.string' => 'Remarks must be a valid string.',
        ];
    }
}
