<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


/**
 * Determine if the user is authorized to make this request.
 */
class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Set to true to allow guest users
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ];
    }
    
}
