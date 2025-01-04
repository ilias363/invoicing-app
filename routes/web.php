<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Home', ['user' => Auth::user()]);
    })->name('home');
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Admin/Home', ['user' => Auth::user()]);
    })->name('admin.home');
});

Route::middleware(['auth', 'role:salesman'])->group(function () {
    Route::get('/salesman', function () {
        return Inertia::render('SalesMan/Home', ['user' => Auth::user()]);
    })->name('salesman.home');
});

Route::middleware(['auth', 'role:accountant'])->group(function () {
    Route::get('/accountant', function () {
        return Inertia::render('Accountant/Home', ['user' => Auth::user()]);
    })->name('accountant.home');
});
