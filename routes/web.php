<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth')->group(function () {    
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Admin/Home');
    })->name('admin.home');

    Route::get('/admin/create-invoice', function () {
        return Inertia::render('Admin/CreateInvoice');
    })->name('admin.create-invoice');

    Route::get('/admin/create-invoice/preview', function () {
        return Inertia::render('Admin/InvoicePreview');
    })->name('admin.preview');
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
