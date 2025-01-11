<?php

use App\Http\Controllers\{
    CompanyController,
    DashboardController,
    InvoiceController,
    ProductController,
    CustomerController,
    UserController
};
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->prefix('admin')->as('admin.')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('home');

    // Company Routes
    Route::get('company/edit', [CompanyController::class, 'edit'])->name('company.edit');
    Route::post('company/edit', [CompanyController::class, 'update']);

    // Invoice Routes
    Route::get('invoices', [InvoiceController::class, 'index'])->name('invoices');
    Route::get('invoices/{id}/preview', [InvoiceController::class, 'show'])->name('invoices.preview');
    Route::get('create-invoice', [InvoiceController::class, 'create'])->name('create-invoice');
    Route::post('create-invoice', [InvoiceController::class, 'store']);
    Route::get('invoices/{id}/edit', [InvoiceController::class, 'edit'])->name('invoices.edit');
    Route::post('invoices/{id}/edit', [InvoiceController::class, 'update']);
    Route::delete('invoices/{id}/delete', [InvoiceController::class, 'destroy'])->name('invoices.destroy');
    Route::post('invoices/{id}/doc-style', [InvoiceController::class, 'assignDocStyle']);
    Route::post('invoices/{id}/approve', [InvoiceController::class, 'approve'])->name('invoices.approve');
    Route::post('invoices/{id}/deny', [InvoiceController::class, 'deny'])->name('invoices.deny');
    Route::post('invoices/send-invoice', [InvoiceController::class, 'sendInvoice'])->name('invoices.send-invoice');

    // Product Routes
    Route::get('products', [ProductController::class, 'index'])->name('products');
    Route::get('create-product', [ProductController::class, 'create'])->name('create-product');
    Route::post('create-product', [ProductController::class, 'store']);
    Route::get('products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::post('products/{id}/edit', [ProductController::class, 'update']);
    Route::delete('products/{id}/delete', [ProductController::class, 'destroy'])->name('products.destroy');

    // Customer Routes
    Route::get('customers', [CustomerController::class, 'index'])->name('customers');
    Route::get('create-customer', [CustomerController::class, 'create'])->name('create-customer');
    Route::post('create-customer', [CustomerController::class, 'store']);
    Route::get('customers/{id}/edit', [CustomerController::class, 'edit'])->name('customers.edit');
    Route::post('customers/{id}/edit', [CustomerController::class, 'update']);
    Route::delete('customers/{id}/delete', [CustomerController::class, 'destroy'])->name('customers.destroy');

    // User Routes
    Route::get('users', [UserController::class, 'index'])->name('users');
    Route::get('create-user', [UserController::class, 'create'])->name('create-user');
    Route::post('create-user', [UserController::class, 'store']);
    Route::get('users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::post('users/{id}/edit', [UserController::class, 'update']);
    Route::delete('users/{id}/delete', [UserController::class, 'destroy'])->name('users.destroy');
});
