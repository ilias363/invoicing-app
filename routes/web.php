<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Models\Invoice;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth')->group(function () {    
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/create-invoice', function () {
        return Inertia::render('Admin/CreateInvoice');
    })->name('admin.create-invoice');

    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.home');

    Route::get('/admin/invoices', [InvoiceController::class, 'searchInvoices'])->name('admin.invoices');
    Route::get('/admin/products', [ProductController::class, 'index'])->name('admin.products');
    Route::get('/admin/customers', [CustomerController::class, 'index'])->name('admin.customers');
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users');
    
    Route::get('/admin/create-invoice/preview', function () {
        return Inertia::render('Admin/InvoicePreview');
    })->name('admin.preview');
    
});

Route::middleware(['auth', 'role:salesman'])->group(function () {
    Route::get('/salesman/dashboard', function () {
        return Inertia::render('SalesMan/Home', ['user' => Auth::user()]);
    })->name('salesman.home');
});

Route::middleware(['auth', 'role:accountant'])->group(function () {
    Route::get('/accountant/dashboard', function () {
        return Inertia::render('Accountant/Home', ['user' => Auth::user()]);
    })->name('accountant.home');
});
