<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Company;
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

        Product::factory()->count(70)->create();

        $usedEmails = [];

        foreach (range(1, 30) as $i) {
            
            do {
                $customer = Customer::factory()->make();
                $email = $customer->email;
            } while (in_array($email, $usedEmails));

            $usedEmails[] = $email;
            Customer::create($customer->toArray());
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
                $user['account_status'] = 'active';
                User::factory()->create($user);
            }
        }

        User::factory()->create([
            'email' => 'closed@gmail.com',
            'password' => 'closed',
            'account_status' => 'closed',
        ]);

        $customers = Customer::all();
        $docStyles = DocStyle::all();
        $products = Product::all();

        Invoice::factory(50)
            ->create([
                'customer_id' => fn() => $customers->random()->id,
                'doc_style_id' => fn() => $docStyles->random()->id,
            ])
            ->each(function ($invoice) use ($products) {
                $selectedProducts = $products->random(rand(1, 5));

                $totalAmount = 0;
                foreach ($selectedProducts as $product) {
                    $quantity = rand(1, 20);
                    $subtotal = $product->price * (1 - $product->discount / 100) * $quantity;
                    $totalAmount += $subtotal;

                    $invoice->products()->attach($product->id, [
                        'quantity' => $quantity,
                    ]);
                }

                $invoice->update(['total_amount' => $totalAmount * (1 + Company::first()->tax_rate)]);
            });

        $users = User::all();
        $invoices = Invoice::all();

        Log::factory(30)->create([
            'user_id' => fn() => $users->random()->id,
            'invoice_id' => fn() => $invoices->random()->id,
        ]);
    }
}
