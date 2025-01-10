<?php

use App\Http\Controllers\{DashboardController, InvoiceController, CustomerController};
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:accountant'])->prefix('accountant')->as('accountant.')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('home');

    // Invoice Routes
    Route::get('invoices', [InvoiceController::class, 'index'])->name('invoices');
    Route::get('invoices/{id}/preview', [InvoiceController::class, 'show'])->name('invoices.preview');
    Route::get('create-invoice', [InvoiceController::class, 'create'])->name('create-invoice');
    Route::post('create-invoice', [InvoiceController::class, 'store']);
    Route::get('invoices/{id}/edit', [InvoiceController::class, 'edit'])->name('invoices.edit');
    Route::post('invoices/{id}/edit', [InvoiceController::class, 'update']);
    Route::delete('invoices/{id}/delete', [InvoiceController::class, 'destroy'])->name('invoices.destroy');

    // Customer Routes
    Route::get('customers', [CustomerController::class, 'index'])->name('customers');
});
