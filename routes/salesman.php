<?php

use App\Http\Controllers\{DashboardController, InvoiceController, ProductController, CustomerController};
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:salesman'])->prefix('salesman')->as('salesman.')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('home');

    // Invoice Routes
    Route::get('invoices', [InvoiceController::class, 'index'])->name('invoices');
    Route::get('invoices/{id}/preview', [InvoiceController::class, 'show'])->name('invoices.preview');
    Route::get('create-invoice', [InvoiceController::class, 'create'])->name('create-invoice');
    Route::post('create-invoice', [InvoiceController::class, 'store']);
    Route::get('invoices/{id}/edit', [InvoiceController::class, 'edit'])->name('invoices.edit');
    Route::post('invoices/{id}/edit', [InvoiceController::class, 'update']);

    // Product Routes
    Route::get('products', [ProductController::class, 'index'])->name('products');
    Route::get('create-product', [ProductController::class, 'create'])->name('create-product');
    Route::post('create-product', [ProductController::class, 'store']);
    Route::get('products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::post('products/{id}/edit', [ProductController::class, 'update']);

    // Customer Routes
    Route::get('customers', [CustomerController::class, 'index'])->name('customers');
    Route::get('create-customer', [CustomerController::class, 'create'])->name('create-customer');
    Route::post('create-customer', [CustomerController::class, 'store']);
    Route::get('customers/{id}/edit', [CustomerController::class, 'edit'])->name('customers.edit');
    Route::post('customers/{id}/edit', [CustomerController::class, 'update']);
});
