<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProductTypeController;
use Illuminate\Support\Facades\Route;

// Authentication Routes
Route::post('/signup', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:api')->post('/logout', [AuthController::class, 'logout']);

// Product Types Routes (Authenticated)
Route::middleware('auth:api')->group(function () {
    Route::get('/product-types', [ProductTypeController::class, 'index']); // Fetch all product types
    Route::get('/product-types/{id}', [ProductTypeController::class, 'show']); // Fetch a single product type
    Route::post('/product-types', [ProductTypeController::class, 'store']); // Create a new product type
    Route::put('/product-types/{id}', [ProductTypeController::class, 'update']); // Update a product type
    Route::delete('/product-types/{id}', [ProductTypeController::class, 'destroy']); // Delete a product type
});
