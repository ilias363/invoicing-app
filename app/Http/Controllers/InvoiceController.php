<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function searchInvoices(Request $request)
    {
        $search = $request->get('search', '');

        $invoices = Invoice::query()
            ->with('customer')
            ->when($search, function ($query, $search) {
                $query->whereHas('customer', function ($query) use ($search) {
                    $query->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%");
                })
                    ->orWhere('status', 'like', "%{$search}%")
                    ->orWhere('payment_status', 'like', "%{$search}%");
            })
            ->paginate(8);

        return Inertia::render('Admin/Invoices', [
            'invoicesData' => response()->json($invoices),
            'searchTerm' => $search,
        ]);
    }

    public function index()
    {
        $invoicesData = Invoice::all();
        return Inertia::render('Admin/Home', [
            'invoicesData' => response()->json($invoicesData)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoice $invoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        //
    }
}
