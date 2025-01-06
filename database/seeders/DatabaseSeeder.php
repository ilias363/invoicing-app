<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\Privilege;
use App\Models\Role;
use App\Models\Customer;
use App\Models\DocStyle;
use App\Models\Invoice;
use App\Models\Log;
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
        Company::first() ?? Company::factory()->create();

        DocStyle::factory()->count(3)->create();

        Product::factory()->count(50)->create();

        Customer::factory()->count(30)->create();

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
            if (!Role::where('name', $role)->exists()) {
                Role::factory()->create(['name' => $role]);
            }
        }

        $users = [
            'admin' => [
                'email' => 'user1@gmail.com',
                'password' => 'user1',
            ],
            'accountant' => [
                'email' => 'user2@gmail.com',
                'password' => 'user2',
            ],
            'salesman' => [
                'email' => 'user3@gmail.com',
                'password' => 'user3',
            ],
        ];

        foreach ($users as $role => $user) {
            if (!User::where('email', $user['email'])->exists()) {
                $role = Role::where('name', $role)->first();
                $user['role_id'] = $role->id;
                $user['password'] = Hash::make($user['password']);
                User::factory()->create($user);
            }
        }


        $customers = Customer::all();
        $docStyles = DocStyle::all();
        $products = Product::all();

        Invoice::factory(50)->create([
            'customer_id' => $customers->random()->id,
            'doc_style_id' => $docStyles->random()->id,
        ])->each(function ($invoice) use ($products) {
            $selectedProducts = $products->random(rand(1, 5));
            foreach ($selectedProducts as $product) {
                $invoice->products()->attach($product->id, [
                    'quantity' => rand(1, 20),
                ]);
            }
        });

        $users = User::all();
        $invoices = Invoice::all();
        Log::factory(30)->create([
            'user_id' => $users->random()->id,
            'invoice_id' => $invoices->random()->id,
        ]);
    }
}
