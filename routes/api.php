<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function(){
    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
    Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => ['auth:api']
], function(){
    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    Route::post('/authenticate', [\App\Http\Controllers\AuthController::class, 'authenticate']);
    Route::resource('product', \App\Http\Controllers\api\product\indexController::class);
    Route::resource('category', \App\Http\Controllers\api\category\indexController::class);
    Route::resource('customer', \App\Http\Controllers\api\customer\indexController::class);
    Route::resource('stock', \App\Http\Controllers\api\stock\indexController::class);
    Route::post('/stock/get-customer',[\App\Http\Controllers\api\stock\indexController::class,'getCustomer']);

});
