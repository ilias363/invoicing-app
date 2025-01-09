<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
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

    Route::get('/admin/create-user', [UserController::class, 'create'])->name('admin.create-user');
    Route::post('/admin/create-user', [UserController::class, 'store']);

    Route::get('/admin/create-customer', [CustomerController::class, 'create'])->name('admin.create-customer');
    Route::post('/admin/create-customer', [CustomerController::class, 'store']);

    Route::get('/admin/create-product', [ProductController::class, 'create'])->name('admin.create-product');
    Route::post('/admin/create-product', [ProductController::class, 'store']);

    Route::get('/admin/invoices/{id}/edit', [InvoiceController::class, 'edit'])->name('admin.invoices.edit');
    Route::post('/admin/invoices/{id}/edit', [InvoiceController::class, 'update']);
    Route::delete('/admin/invoices/{id}/delete', [InvoiceController::class, 'destroy'])->name('admin.invoices.destroy');
    Route::post('/admin/invoices/{id}/approve', [InvoiceController::class, 'approve'])->name('admin.invoices.approve');
    Route::post('/admin/invoices/{id}/deny', [InvoiceController::class, 'deny'])->name('admin.invoices.deny');
    Route::get('/admin/invoices/{id}/preview', [InvoiceController::class, 'show'])->name('admin.invoices.preview');

    Route::get('/admin/users/{id}/edit', [UserController::class, 'edit'])->name('admin.users.edit');
    Route::post('/admin/users/{id}/edit', [UserController::class, 'update']);
    Route::delete('/admin/users/{id}/delete', [UserController::class, 'destroy'])->name('admin.users.destroy');

    Route::get('/admin/customers/{id}/edit', [CustomerController::class, 'edit'])->name('admin.customers.edit');
    Route::post('/admin/customers/{id}/edit', [CustomerController::class, 'update']);
    Route::delete('/admin/customers/{id}/delete', [CustomerController::class, 'destroy'])->name('admin.customers.destroy');

    Route::get('/admin/products/{id}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');
    Route::post('/admin/products/{id}/edit', [ProductController::class, 'update']);
    Route::delete('/admin/products/{id}/delete', [ProductController::class, 'destroy'])->name('admin.products.destroy');
});

Route::middleware(['auth', 'role:salesman'])->group(function () {
    Route::get('/salesman/dashboard', [DashboardController::class, 'index'])->name('salesman.home');

    Route::get('/salesman/invoices', [InvoiceController::class, 'index'])->name('salesman.invoices');
    Route::get('/salesman/products', [ProductController::class, 'index'])->name('salesman.products');
    Route::get('/salesman/customers', [CustomerController::class, 'index'])->name('salesman.customers');
    Route::get('/salesman/users', [UserController::class, 'index'])->name('salesman.users');

    Route::get('/salesman/create-invoice', [InvoiceController::class, 'create'])->name('salesman.create-invoice');
    Route::post('/salesman/create-invoice', [InvoiceController::class, 'store']);

    Route::get('/salesman/create-user', [UserController::class, 'create'])->name('salesman.create-user');
    Route::post('/salesman/create-user', [UserController::class, 'store']);

    Route::get('/salesman/create-customer', [CustomerController::class, 'create'])->name('salesman.create-customer');
    Route::post('/salesman/create-customer', [CustomerController::class, 'store']);

    Route::get('/salesman/create-product', [ProductController::class, 'create'])->name('salesman.create-product');
    Route::post('/salesman/create-product', [ProductController::class, 'store']);

    Route::get('/salesman/invoices/{id}/edit', [InvoiceController::class, 'edit'])->name('salesman.invoices.edit');
    Route::post('/salesman/invoices/{id}/edit', [InvoiceController::class, 'update']);
    Route::delete('/salesman/invoices/{id}/delete', [InvoiceController::class, 'destroy'])->name('salesman.invoices.destroy');
    Route::post('/salesman/invoices/{id}/approve', [InvoiceController::class, 'approve'])->name('salesman.invoices.approve');
    Route::post('/salesman/invoices/{id}/deny', [InvoiceController::class, 'deny'])->name('salesman.invoices.deny');
    Route::get('/salesman/invoices/{id}/preview', [InvoiceController::class, 'show'])->name('salesman.invoices.preview');

    Route::get('/salesman/users/{id}/edit', [UserController::class, 'edit'])->name('salesman.users.edit');
    Route::post('/salesman/users/{id}/edit', [UserController::class, 'update']);
    Route::delete('/salesman/users/{id}/delete', [UserController::class, 'destroy'])->name('salesman.users.destroy');

    Route::get('/salesman/customers/{id}/edit', [CustomerController::class, 'edit'])->name('salesman.customers.edit');
    Route::post('/salesman/customers/{id}/edit', [CustomerController::class, 'update']);
    Route::delete('/salesman/customers/{id}/delete', [CustomerController::class, 'destroy'])->name('salesman.customers.destroy');

    Route::get('/salesman/products/{id}/edit', [ProductController::class, 'edit'])->name('salesman.products.edit');
    Route::post('/salesman/products/{id}/edit', [ProductController::class, 'update']);
    Route::delete('/salesman/products/{id}/delete', [ProductController::class, 'destroy'])->name('salesman.products.destroy');
});

Route::middleware(['auth', 'role:accountant'])->group(function () {
    Route::get('/accountant/dashboard', [DashboardController::class, 'index'])->name('accountant.home');

    Route::get('/accountant/invoices', [InvoiceController::class, 'index'])->name('accountant.invoices');
    Route::get('/accountant/customers', [CustomerController::class, 'index'])->name('accountant.customers');

    Route::get('/accountant/create-invoice', [InvoiceController::class, 'create'])->name('accountant.create-invoice');
    Route::post('/accountant/create-invoice', [InvoiceController::class, 'store']);

    Route::get('/accountant/invoices/{id}/edit', [InvoiceController::class, 'edit'])->name('accountant.invoices.edit');
    Route::post('/accountant/invoices/{id}/edit', [InvoiceController::class, 'update']);
    Route::delete('/accountant/invoices/{id}/delete', [InvoiceController::class, 'destroy'])->name('accountant.invoices.destroy');
    Route::post('/accountant/invoices/{id}/approve', [InvoiceController::class, 'approve'])->name('accountant.invoices.approve');
    Route::post('/accountant/invoices/{id}/deny', [InvoiceController::class, 'deny'])->name('accountant.invoices.deny');
    Route::get('/accountant/invoices/{id}/preview', [InvoiceController::class, 'show'])->name('accountant.invoices.preview');
});
