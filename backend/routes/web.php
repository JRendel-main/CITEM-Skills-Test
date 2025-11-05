<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExhibitorController;

Route::get('/', function () {
    return view('welcome');
});
