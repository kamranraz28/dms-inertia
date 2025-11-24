<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'dp' => 'required|numeric|min:0',
            'brand_id' => 'required|exists:brands,id',
            'cat_id' => 'required|exists:cats,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Product name is required.',
            'model.required' => 'Product model is required.',
            'color.required' => 'Product color is required.',
            'dp.required' => 'Dealer price is required.',
            'dp.numeric' => 'Dealer price must be a number.',
            'dp.min' => 'Dealer price must be at least 0.',
            'brand_id.required' => 'Brand selection is required.',
            'brand_id.exists' => 'Selected brand does not exist.',
            'cat_id.required' => 'Category selection is required.',
            'cat_id.exists' => 'Selected category does not exist.',
        ];
    }
}
