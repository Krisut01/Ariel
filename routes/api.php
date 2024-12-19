<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\MoodEntryController;


Route::middleware('auth:sanctum')->get('/mood-entries', [MoodEntryController::class, 'index']);
Route::middleware('auth:sanctum')->post('/mood-entry', [MoodEntryController::class, 'store']);
