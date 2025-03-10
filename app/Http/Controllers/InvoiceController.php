<?php

namespace App\Http\Controllers;

use App\Mail\InvoiceMail;
use App\Models\Company;
use App\Models\Customer;
use App\Models\DocStyle;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
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

        return Inertia::render('Invoices', [
            'invoicesData' => response()->json($invoices),
            'searchTerm' => $search,
            'sortBy' => $sortBy,
            'sortDirection' => $sortDirection,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers = Customer::all();
        $products = Product::all();
        $taxRate = Company::first()->tax_rate;

        return Inertia::render('CreateInvoice', [
            'customers' => $customers,
            'products' => $products,
            'taxRate' => $taxRate,
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
                $productModel = Product::findOrFail($product['id']);
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

            $user = Auth::user();

            // Prepare log data
            $logData = new Request([
                'time_action' => now(),
                'action' => 'Invoice number ' . $invoice->id . ' CREATED by ' . $user->role->name . ' ' . $user->last_name . ' ' . $user->first_name,
                'user_id' => $user->id,
                'invoice_id' => $invoice->id,
            ]);

            // Call the LogController's store method
            $logController = new LogController();
            $logController->store($logData);



            return redirect()->route($user->role->name . '.invoices')->with('success', 'Invoice successfully created.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Error creating the invoice.');
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

        $user = Auth::user();
        // Prepare log data
        $logData = new Request([
            'time_action' => now(),
            'action' => 'Invoice number ' . $invoice->id . ' APPROVED by ' . $user->role->name . ' ' . $user->last_name . ' ' . $user->first_name,
            'user_id' => $user->id,
            'invoice_id' => $invoice->id,
        ]);

        // Call the LogController's store method
        $logController = new LogController();
        $logController->store($logData);

        return redirect()->back()->with('success', 'Invoice approved successfully.');
    }

    public function deny($id)
    {
        $invoice = Invoice::find($id);

        if ($invoice->status !== 'pending') {
            return redirect()->back()->with('error', 'Only pending invoices can be denied.');
        }

        $invoice->status = 'denied';
        $invoice->payment_status = 'cancelled';
        $invoice->save();

        $user = Auth::user();
        // Prepare log data
        $logData = new Request([
            'time_action' => now(),
            'action' => 'Invoice number ' . $invoice->id . ' DENIED by ' . $user->role->name . ' ' . $user->last_name . ' ' . $user->first_name,
            'user_id' => $user->id,
            'invoice_id' => $invoice->id,
        ]);

        // Call the LogController's store method
        $logController = new LogController();
        $logController->store($logData);

        return redirect()->back()->with('success', 'Invoice denied successfully.');
    }

    public function assignDocStyle(Request $request, $id)
    {
        $validated = $request->validate([
            'font_family' => 'required',
            'title_color' => 'required|string|max:30',
            'table_head_color' => 'required|string|max:30',
            'bg_color' => 'required|string|max:30',
        ]);

        try {
            $invoice = Invoice::findOrFail($id);
            $docStyle = DocStyle::create($validated);

            $invoice->doc_style_id = $docStyle->id;
            $invoice->save();

            return redirect()->back()->with('success', 'Layout saved to the Invoice successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error saving layout: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $company = Company::first();
            $invoice = Invoice::with([
                'customer',
                'products' => function ($query) {
                    $query->withPivot('quantity');
                }
            ])->findOrFail($id);

            $docStyle = $invoice->docStyle()->get()->first() ?? [
                'font_family' => 'Lato, sans-serif',
                'title_color' => '#2A2A2A',
                'table_head_color' => '#000000',
                'bg_color' => '#ffffff'
            ];

            $fonts = [
                'Lato, sans-serif',
                'Arial, sans-serif',
                'Times New Roman, sans-serif',
                'Roboto, sans-serif',
            ];

            return Inertia::render('PreviewInvoice', [
                'company' => $company,
                'invoice' => $invoice,
                'docStyle' => $docStyle,
                'fonts' => $fonts,
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error fetching the invoice.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $invoice = Invoice::with(['products' => function ($query) {
            $query->select('products.id', 'invoice_product.quantity');
        }])->find($id);
        $customers = Customer::all();
        $products = Product::all();
        $taxRate = Company::first()->tax_rate;

        return inertia('UpdateInvoice', [
            'invoice' => $invoice,
            'customers' => $customers,
            'products' => $products,
            'taxRate' => $taxRate,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'invoice_date' => 'required|date',
            'due_date' => 'nullable|date|after_or_equal:invoice_date',
            'payment_method' => 'required|in:Credit Card,Bank Transfer,Cash',
            'payment_status' => 'required|in:pending,paid,cancelled',
            'notes' => 'nullable|string|max:500',
            'products' => 'required|array|min:1',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.init_quantity' => '',
        ], [
            'customer_id.required' => 'Customer selection is required.',
            'customer_id.exists' => 'The selected customer does not exist.',
            'invoice_date.required' => 'The invoice date is required.',
            'invoice_date.date' => 'The invoice date must be a valid date.',
            'due_date.date' => 'The due date must be a valid date.',
            'due_date.after_or_equal' => 'The due date cannot be earlier than the invoice date.',
            'payment_method.required' => 'A payment method is required.',
            'payment_method.in' => 'The selected payment method is invalid.',
            'payment_status.required' => 'A payment status is required.',
            'payment_status.in' => 'The selected payment status is invalid.',
            'notes.string' => 'Notes must be a valid string.',
            'products.required' => 'At least one product is required.',
            'products.min' => 'You must add at least one product.',
            'products.*.id.required' => 'Each product must have a valid ID.',
            'products.*.id.exists' => 'One or more selected products do not exist.',
            'products.*.quantity.required' => 'The quantity for each product is required.',
            'products.*.quantity.integer' => 'The quantity must be a valid integer.',
            'products.*.quantity.min' => 'The quantity must be at least 1.',
        ]);

        // dd($validatedData);

        DB::beginTransaction();

        try {
            $invoice = Invoice::findOrFail($id);

            // Update the invoice details
            $invoice->update([
                'customer_id' => $validatedData['customer_id'],
                'invoice_date' => $validatedData['invoice_date'],
                'due_date' => $validatedData['due_date'],
                'payment_method' => $validatedData['payment_method'],
                'payment_status' => $validatedData['payment_status'],
                'notes' => $validatedData['notes'],
                'status' => 'pending',
            ]);

            // Rollback stock quantities for previous products
            $previousProducts = $invoice->products()->withPivot('quantity')->get();
            foreach ($previousProducts as $existingProduct) {
                $productModel = Product::findOrFail($existingProduct->id);
                $productModel->stock_quantity += $existingProduct->pivot->quantity;
                $productModel->save();
            }

            // Detach previous products
            $invoice->products()->detach();

            $totalAmount = 0;

            // Add new products
            foreach ($validatedData['products'] as $product) {
                $productModel = Product::findOrFail($product['id']);
                $totalAmount += $productModel->price * (1 - ($productModel->discount / 100)) * $product['quantity'];

                // Attach new product with its quantity
                $invoice->products()->attach($product['id'], [
                    'quantity' => $product['quantity'],
                ]);

                // Update stock quantity
                $productModel->stock_quantity -= $product['quantity'];
                $productModel->save();
            }

            // Update total amount with tax
            $invoice->update([
                'total_amount' => $totalAmount * (1 + Company::first()->tax_rate / 100),
            ]);

            DB::commit();

            $user = Auth::user();
            // Prepare log data
            $logData = new Request([
                'time_action' => now(),
                'action' => 'Invoice number ' . $invoice->id . ' UPDATED by ' . $user->role->name . ' ' . $user->last_name . ' ' . $user->first_name,
                'user_id' => $user->id,
                'invoice_id' => $invoice->id,
            ]);

            $logController = new LogController();
            $logController->store($logData);

            return redirect()->route($user->role->name . '.invoices')->with('success', 'Invoice successfully updated.');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $invoice = Invoice::find($id);
        $invoice->delete();

        $user = Auth::user();
        // Prepare log data
        $logData = new Request([
            'time_action' => now(),
            'action' => 'Invoice number ' . $invoice->id . ' DELETED by ' . $user->role->name . ' ' . $user->last_name . ' ' . $user->first_name,
            'user_id' => $user->id,
            'invoice_id' => $invoice->id,
        ]);

        // Call the LogController's store method
        $logController = new LogController();
        $logController->store($logData);
        return redirect()->back()->with('success', 'Invoice deleted successfully.');
    }

    public function sendInvoice(Request $request)
    {
        $invoice_id = $request->invoice_id;
        $customer_name = $request->customer_name;
        // $email = $request->email;
        $email = config('mail.test_mail_to_send_to');
        $pdfBase64 = $request->pdfBase64;

        if (!$pdfBase64) {
            return redirect()->back()->with('error', 'No PDF data provided.');
        }

        // Remove the base64 prefix if present
        if (str_contains($pdfBase64, 'base64,')) {
            $pdfBase64 = explode('base64,', $pdfBase64)[1];
        }

        try {
            $pdfBuffer = base64_decode($pdfBase64);

            if ($pdfBuffer === false) {
                return redirect()->back()->with('error', 'Failed to decode PDF.');
            }

            Mail::to($email)->send(new InvoiceMail($invoice_id, $customer_name, $pdfBuffer));

            $user = Auth::user();
            // Prepare log data
            $logData = new Request([
                'time_action' => now(),
                'action' => 'Invoice number ' . $invoice_id . ' SENT to ' . $customer_name . ' by ' . $user->role->name . ' ' . $user->last_name . ' ' . $user->first_name,
                'user_id' => $user->id,
                'invoice_id' => $invoice_id,
            ]);

            // Call the LogController's store method
            $logController = new LogController();
            $logController->store($logData);

            return redirect()->back()->with('success', 'Email sent successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred: ' . $e->getMessage());
        }
    }
}
