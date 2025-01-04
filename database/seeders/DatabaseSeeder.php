<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\Privilege;
use App\Models\Role;
use App\Models\Customer;
use App\Models\DocStyle;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $company = Company::first() ?? Company::factory()->create();
        Customer::factory()->count(5)->create();

        // Define specific privileges
        $privileges = [
            'Manage Users',
            'View Invoices',
            'Edit Invoices',
            'Manage Invoices',
            'Create Sales Order',
            'View Sales Orders',
            'View Financial Records',
            'Approve Invoices',
            'Manage Roles',
        ];

        foreach ($privileges as $privilege) {
            if (!Privilege::where('name', $privilege)->exists()) {
                Privilege::factory()->create(['name' => $privilege]);
            }
        }
    
        $roles = [
            'admin',
            'accountant',
            'salesman',
        ];

        foreach ($roles as $role) {
            // Check if the role already exists before creating
            if (!Role::where('name', $role)->exists()) {
                Role::factory()->create(['name' => $role]);
            }
        }

        User::factory()->create([
            'email' => 'user1@gmail.com',
            'password' => Hash::make('user1'),
            'role_id' => 1,
        ]);
        User::factory()->create([
            'email' => 'user2@gmail.com',
            'password' => Hash::make('user2'),
            'role_id' => 2,
        ]);
        User::factory()->create([
            'email' => 'user3@gmail.com',
            'password' => Hash::make('user3'),
            'role_id' => 3,
        ]);

        DocStyle::factory()->count(2)->create();
        Product::factory()->count(10)->create();
        
        
    }
}
