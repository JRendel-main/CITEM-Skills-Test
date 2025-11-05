<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExhibitorController;

// Test route
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

Route::controller(ExhibitorController::class)->group( function () {
    Route::get('exhibitors', 'index')->name('exhibitors.index');
    Route::post('exhibitors', 'store')->name('exhibitors.store');
    Route::get('exhibitors/{id}/edit', 'edit')->name('exhibitors.edit');
    Route::put('exhibitors/{id}', 'update')->name('exhibitors.update');
    Route::delete('exhibitors/{id}', 'destroy')->name('exhibitors.destroy');
});

