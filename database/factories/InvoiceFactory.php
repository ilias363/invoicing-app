<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Models\Customer;
use App\Models\DocStyle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Invoice>
 */
class InvoiceFactory extends Factory
{
    protected $model = Invoice::class;

    public function definition(): array
    {
        return [
            'invoice_date' => $this->faker->date(),
            'total_amount' => $this->faker->randomFloat(2, 50, 10000), // Random amount between 50 and 10,000
            'status' => $this->faker->randomElement(['draft', 'issued', 'paid', 'cancelled']),
            'payment_status' => $this->faker->randomElement(['pending', 'completed', 'failed']),
            'notes' => $this->faker->text(200),
            'due_date' => $this->faker->optional()->date(),
            'is_active' => $this->faker->boolean,
            'payment_method' => $this->faker->randomElement(['Credit Card', 'Bank Transfer', 'Cash']),
            'tax' => $this->faker->optional()->randomFloat(2, 0, 20), // Tax rate between 0 and 20
            'customer_id' => Customer::factory(), 
            'doc_style_id' => DocStyle::factory(), 
        ];
    }
}
