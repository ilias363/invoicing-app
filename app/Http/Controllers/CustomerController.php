<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        $user = Auth::user();

        return Inertia::render('Admin/Customers', [
            'customersData' => response()->json($customers),
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
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        //
    }
}
