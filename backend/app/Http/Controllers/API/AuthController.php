<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
    
        try {
            $token = JWTAuth::fromUser($user);
        } catch (\Exception $e) {
            Log::error('JWT Token creation error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Could not create token.',
                'error' => $e->getMessage()
            ], 500);
        }
    
        return response()->json([
            'message' => 'User registered successfully.',
            'token' => $token,
            'user' => $user,
        ], 201);
    }
    
    
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['message' => 'Invalid Credentials!'], 401);
        }

        return response()->json([
            'success' => 'Login Successful!',
            'token' => $token,
            'user' => Auth::guard('api')->user()
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('api')->logout();
        return response()->json(['message' => 'Logout Successful!']);
    }
}
