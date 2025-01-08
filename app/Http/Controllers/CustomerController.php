<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $sortBy = $request->get('sortBy', 'customer_name');
        $sortDirection = $request->get('sortDirection', 'asc');

        $customers = Customer::query()
            ->when($search, function ($query, $search) {
                $query->whereRaw("CONCAT(last_name, ' ', first_name) LIKE ?", ["%{$search}%"]);
            })
            ->when($sortBy === 'customer_name', function ($query) use ($sortDirection) {
                $query->orderByRaw('CONCAT(last_name, " ", first_name) ' . $sortDirection);
            }, function ($query) use ($sortBy, $sortDirection) {
                $query->orderBy($sortBy, $sortDirection);
            })
            ->paginate(8);


        return Inertia::render('Admin/Customers', [
            'customersData' => response()->json($customers),
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
        return Inertia::render('Admin/CreateCustomer');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'email' => 'required|email|unique:customers,email',
        ], [
            'first_name.required' => 'First name is required.',
            'last_name.required' => 'Last name is required.',
            'email.required' => 'Email is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email is already taken.',
            'phone.max' => 'Phone number must not exceed 20 characters.',
            'address.max' => 'Address must not exceed 255 characters.',
        ]);
    
        DB::beginTransaction();
    
        try {
            $customer = Customer::create([
                'first_name' => $validatedData['first_name'],
                'last_name' => $validatedData['last_name'],
                'phone' => $validatedData['phone'],
                'address' => $validatedData['address'],
                'email' => $validatedData['email'],
            ]);
    
            DB::commit();
    
            return redirect()->route('admin.customers')->with('success', 'Customer created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
    
            return redirect()->back()->withErrors(['error' => 'Failed to create the customer. Please try again later.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $customerToEdit = Customer::find($id);

        return inertia('Admin/UpdateCustomer', [
            'customerToEdit' => $customerToEdit,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email,' . $customer->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
        ], [
            'first_name.required' => 'First name is required.',
            'last_name.required' => 'Last name is required.',
            'email.required' => 'Email is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email is already taken.',
            'phone.max' => 'Phone number must not exceed 20 characters.',
            'address.max' => 'Address must not exceed 255 characters.',
        ]);

        DB::beginTransaction();

        try {
            $customer->first_name = $validatedData['first_name'];
            $customer->last_name = $validatedData['last_name'];
            $customer->email = $validatedData['email'];
            $customer->phone = $validatedData['phone'];
            $customer->address = $validatedData['address'];

            $customer->save();

            DB::commit();

            return redirect()->route('admin.customers')->with('success', 'Customer updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()->withErrors(['error' => 'Failed to update the customer. Please try again later.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $customer = Customer::find($id);
        $customer->delete();

        return redirect()->back()->with('success', 'Customer deleted successfully.');
    }
}
