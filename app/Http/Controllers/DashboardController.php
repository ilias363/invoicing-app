<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Log;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $logs = Log::with(['user', 'invoice'])->get();
        $invoices = Invoice::all();
        $roles = Role::all();
        $user = Auth::user();
    
        return Inertia::render('Admin/Home', [
            'logs' => response()->json($logs),
            'invoicesData' => response()->json($invoices),
            'roles' => response()->json($roles),
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
