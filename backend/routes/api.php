

<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Support\Facades\Route;

// Authentication Routes
Route::post('/signup', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:api')->post('/logout', [AuthController::class, 'logout']);