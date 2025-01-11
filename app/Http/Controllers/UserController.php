<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $sortBy = $request->get('sortBy', 'user_name');
        $sortDirection = $request->get('sortDirection', 'asc');

        $users = User::query()
            ->with('role')
            ->select('users.*')
            ->leftJoin('roles', 'users.role_id', '=', 'roles.id')
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->whereRaw("CONCAT(users.last_name, ' ', users.first_name) LIKE ?", ["%{$search}%"])
                        ->orWhere('roles.name', 'like', "%{$search}%");
                });
            })
            ->when($sortBy === 'user_name', function ($query) use ($sortDirection) {
                $query->orderByRaw('CONCAT(users.last_name, " ", users.first_name) ' . $sortDirection);
            })
            ->when($sortBy === 'role_name', function ($query) use ($sortDirection) {
                $query->orderBy('roles.name', $sortDirection);
            })
            ->when(!in_array($sortBy, ['user_name', 'role_name']), function ($query) use ($sortBy, $sortDirection) {
                $query->orderBy('users.' . $sortBy, $sortDirection);
            })
            ->paginate(8);

        return Inertia::render('Admin/Users', [
            'usersData' => response()->json($users),
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
        return Inertia::render('Admin/CreateUser',[
            'roles' => Role::all(),]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:5|confirmed',
            'password_confirmation' => 'required|string',
            'account_status' => 'required|in:active,inactive',
            'role_id' => 'required|exists:roles,id',
        ], [
            'first_name.required' => 'First name is required.',
            'last_name.required' => 'Last name is required.',
            'email.required' => 'Email is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email is already taken.',
            'password.required' => 'Password is required.',
            'password.confirmed' => 'The password confirmation does not match.',
            'password_confirmation.required' => 'Password confirmation is required.',
            'account_status.required' => 'Account status is required.',
            'account_status.in' => 'Invalid account status.',
            'role_id.required' => 'Role is required.',
            'role_id.exists' => 'The selected role does not exist.',
        ]);

        DB::beginTransaction();

        try {
            $user = User::create([
                'first_name' => $validatedData['first_name'],
                'last_name' => $validatedData['last_name'],
                'email' => $validatedData['email'],
                'phone' => $validatedData['phone'],
                'password' => bcrypt($validatedData['password']),
                'account_status' => $validatedData['account_status'],
                'role_id' => $validatedData['role_id'],
            ]);

            DB::commit();

            return redirect()->route('admin.users')->with('success', 'User created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()->withErrors(['error' => 'Failed to create the user. Please try again later.']);
        }
    }




    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $userToedit = User::find($id);

        return inertia('Admin/UpdateUser', [
            'userToedit' => $userToedit,
            'roles' => Role::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'password' => 'nullable|string|min:5|confirmed',
            'account_status' => 'required|in:active,inactive',
            'role_id' => 'required|exists:roles,id',
        ], [
            'first_name.required' => 'First name is required.',
            'last_name.required' => 'Last name is required.',
            'email.required' => 'Email is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email is already taken.',
            'password.confirmed' => 'The password confirmation does not match.',
            'account_status.required' => 'Account status is required.',
            'account_status.in' => 'Invalid account status.',
            'role_id.required' => 'Role is required.',
            'role_id.exists' => 'The selected role does not exist.',
        ]);

        DB::beginTransaction();

        try {
            $user->first_name = $validatedData['first_name'];
            $user->last_name = $validatedData['last_name'];
            $user->email = $validatedData['email'];
            $user->phone = $validatedData['phone'];
            $user->account_status = $validatedData['account_status'];
            $user->role_id = $validatedData['role_id'];

            if (!empty($validatedData['password'])) {
                $user->password = bcrypt($validatedData['password']);
            }

            $user->save();

            DB::commit();

            return redirect()->route('admin.users')->with('success', 'User updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()->withErrors(['error' => 'Failed to update the user. Please try again later.']);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();

        return redirect()->back()->with('success', 'user deleted successfully.');
    }
}
