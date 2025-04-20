<?php
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\ProductTypeController;
use Illuminate\Support\Facades\Route;

// Authentication Routes
Route::post('/signup', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:api')->post('/logout', [AuthController::class, 'logout']);

// Product Types & Items Routes (Authenticated)
Route::middleware('auth:api')->group(function () {
    // Product Types
    Route::get('/product-types', [ProductTypeController::class, 'index']);
    Route::get('/product-types/{id}', [ProductTypeController::class, 'show']);
    Route::post('/product-types', [ProductTypeController::class, 'store']);
    Route::put('/product-types/{id}', [ProductTypeController::class, 'update']);
    Route::delete('/product-types/{id}', [ProductTypeController::class, 'destroy']);

    // Items 👇
    Route::get('/product-types/{id}/items', [ItemController::class, 'index']);           // List items of a product type
    Route::post('/product-types/{productTypeId}/items', [ItemController::class, 'store']);          // Add items
    Route::put('/items/{id}', [ItemController::class, 'update']);                        // Edit item
    Route::put('/items/{id}/sold', [ItemController::class, 'markSold']);                 // Mark as sold
    Route::delete('/items/{id}', [ItemController::class, 'destroy']);                    // Delete item
});
