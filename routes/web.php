<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.home');

    Route::get('/admin/invoices', [InvoiceController::class, 'index'])->name('admin.invoices');
    Route::get('/admin/products', [ProductController::class, 'index'])->name('admin.products');
    Route::get('/admin/customers', [CustomerController::class, 'index'])->name('admin.customers');
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users');

    Route::get('/admin/create-invoice', [InvoiceController::class, 'create'])->name('admin.create-invoice');
    Route::post('/admin/create-invoice', [InvoiceController::class, 'store']);

    Route::get('/admin/create-invoice/preview', function () {
        return Inertia::render('Admin/InvoicePreview');
    })->name('admin.preview');

    Route::get('/admin/create-user', [UserController::class, 'create'])->name('admin.create-user');
    Route::post('/admin/create-user', [UserController::class, 'store']);

    Route::post('/admin/invoices/{id}/approve', [InvoiceController::class, 'approve'])->name('admin.invoices.approve');
    Route::post('/admin/invoices/{id}/deny', [InvoiceController::class, 'deny'])->name('admin.invoices.deny');
    Route::get('/admin/invoices/{id}/edit', [InvoiceController::class, 'edit'])->name('admin.invoices.edit');
    Route::delete('/admin/invoices/{id}/delete', [InvoiceController::class, 'destroy'])->name('admin.invoices.destroy');

    Route::get('/admin/users/{id}/edit', [UserController::class, 'edit'])->name('admin.users.edit');
    Route::post('/admin/users/{id}/edit', [UserController::class, 'update']);
    Route::delete('/admin/users/{id}/delete', [UserController::class, 'destroy'])->name('admin.users.destroy');
});

Route::middleware(['auth', 'role:salesman'])->group(function () {
    Route::get('/salesman/dashboard', function () {
        return Inertia::render('SalesMan/Home');
    })->name('salesman.home');
});

Route::middleware(['auth', 'role:accountant'])->group(function () {
    Route::get('/accountant/dashboard', function () {
        return Inertia::render('Accountant/Home');
    })->name('accountant.home');
});
