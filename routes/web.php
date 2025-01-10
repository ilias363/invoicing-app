<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Authentication Routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth')->post('/logout', [AuthController::class, 'logout'])->name('logout');

// Role-Based Routes
require __DIR__ . '/admin.php';
require __DIR__ . '/salesman.php';
require __DIR__ . '/accountant.php';
