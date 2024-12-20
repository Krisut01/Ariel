<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\MoodEntryController;


Route::middleware('auth:sanctum')->post('/mood-entry', [MoodEntryController::class, 'store']);
Route::middleware('auth:sanctum')->get('/api/mood-entries', [MoodEntryController::class, 'index']);
Route::get('/user-analytics', [AnalyticsController::class, 'getUserAnalytics'])->middleware('auth:sanctum');


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
