<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $sortBy = $request->get('sortBy', 'invoice_date');
        $sortDirection = $request->get('sortDirection', 'desc');

        $invoices = Invoice::query()
            ->with('customer')
            ->select('invoices.*')
            ->leftJoin('customers', 'invoices.customer_id', '=', 'customers.id')
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('customers.first_name', 'like', "%{$search}%")
                        ->orWhere('customers.last_name', 'like', "%{$search}%")
                        ->orWhere('invoices.status', 'like', "%{$search}%")
                        ->orWhere('invoices.payment_status', 'like', "%{$search}%");
                });
            })
            ->when($sortBy === 'customer_name', function ($query) use ($sortDirection) {
                $query->orderByRaw('CONCAT(customers.last_name, " ", customers.first_name) ' . $sortDirection);
            }, function ($query) use ($sortBy, $sortDirection) {
                $query->orderBy('invoices.' . $sortBy, $sortDirection);
            })
            ->paginate(8);

        $user = Auth::user();

        return Inertia::render('Admin/Invoices', [
            'invoicesData' => response()->json($invoices),
            'searchTerm' => $search,
            'sortBy' => $sortBy,
            'sortDirection' => $sortDirection,
            'user' => $user,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $customers = Customer::all();
        $products = Product::all();
        $taxRate = Company::first()->tax_rate;

        return Inertia::render('Admin/CreateInvoice', [
            'customers' => $customers,
            'products' => $products,
            'taxRate' => $taxRate,
            'user' => $user,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'invoice_date' => 'required|date',
            'due_date' => 'nullable|date|after_or_equal:invoice_date',
            'payment_method' => 'required|in:Credit Card,Bank Transfer,Cash',
            'notes' => 'nullable|string|max:500',
            'products' => 'required|array|min:1',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ], [
            'customer_id.required' => 'Customer selection is required.',
            'customer_id.exists' => 'The selected customer does not exist.',
            'invoice_date.required' => 'The invoice date is required.',
            'invoice_date.date' => 'The invoice date must be a valid date.',
            'due_date.date' => 'The due date must be a valid date.',
            'due_date.after_or_equal' => 'The due date cannot be earlier than the invoice date.',
            'payment_method.required' => 'A payment method is required.',
            'payment_method.in' => 'The selected payment method is invalid.',
            'notes.string' => 'Notes must be a valid string.',
            'products.required' => 'At least one product is required.',
            'products.min' => 'You must add at least one product.',
            'products.*.product_id.required' => 'Each product must have a valid ID.',
            'products.*.product_id.exists' => 'One or more selected products do not exist.',
            'products.*.quantity.required' => 'The quantity for each product is required.',
            'products.*.quantity.integer' => 'The quantity must be a valid integer.',
            'products.*.quantity.min' => 'The quantity must be at least 1.',
        ]);

        DB::beginTransaction();

        try {
            $invoice = Invoice::create([
                'customer_id' => $validatedData['customer_id'],
                'invoice_date' => $validatedData['invoice_date'],
                'due_date' => $validatedData['due_date'],
                'payment_method' => $validatedData['payment_method'],
                'notes' => $validatedData['notes'],
                'total_amount' => 0,
                'status' => 'pending',
                'payment_status' => 'pending',
            ]);

            $totalAmount = 0;

            foreach ($validatedData['products'] as $product) {
                $productModel = Product::find($product['id']);
                $totalAmount += $productModel->price * (1 - ($productModel->discount / 100)) * $product['quantity'];

                DB::table('invoice_product')->insert([
                    'invoice_id' => $invoice->id,
                    'product_id' => $product['id'],
                    'quantity' => $product['quantity'],
                ]);

                $productModel->stock_quantity -= $product['quantity'];
                $productModel->save();
            }

            $invoice->update([
                'total_amount' => $totalAmount * (1 + Company::first()->tax_rate / 100),
            ]);

            DB::commit();

            return redirect()->route("admin.invoices");
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors([
                'creation' => 'Error creating the invoice.',
            ]);
        }
    }

    public function approve($id)
    {
        $invoice = Invoice::find($id);

        if ($invoice->status !== 'pending') {
            return redirect()->back()->with('error', 'Only pending invoices can be approved.');
        }

        $invoice->status = 'approved';
        $invoice->save();

        return redirect()->back()->with('success', 'Invoice approved successfully.');
    }

    public function deny($id)
    {
        $invoice = Invoice::find($id);

        if ($invoice->status !== 'pending') {
            return redirect()->back()->with('error', 'Only pending invoices can be denied.');
        }

        $invoice->status = 'denied';
        $invoice->save();

        return redirect()->back()->with('success', 'Invoice denied successfully.');
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
    public function edit($id)
    {
        $invoice = Invoice::find($id);

        return inertia('Admin/EditInvoice', [
            'invoice' => $invoice
        ]);
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
    public function destroy($id)
    {
        $invoice = Invoice::find($id);
        $invoice->delete();

        return redirect()->back()->with('success', 'Invoice deleted successfully.');
    }
}
