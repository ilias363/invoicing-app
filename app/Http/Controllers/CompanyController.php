<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        $company = Company::first();

        return inertia('Admin/Company', ['company' => $company]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:50',
            'address' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'tax_id' => 'required|string|max:10',
            'tax_rate' => 'required|numeric|min:0|max:100',
            'logo' => 'nullable|string',
        ]);

        $company = Company::first();

        $company->name = $validatedData['name'];
        $company->address = $validatedData['address'];
        $company->email = $validatedData['email'];
        $company->phone = $validatedData['phone'];
        $company->tax_id = $validatedData['tax_id'];
        $company->tax_rate = $validatedData['tax_rate'];

        if (!empty($validatedData['logo'])) {
            $logoData = explode('base64,', $validatedData['logo']);
            if (count($logoData) === 2) {
                $company->logo = $logoData[1];
            }
        }

        $company->save();

        return redirect()->back()->with('success', 'Company updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }
}
