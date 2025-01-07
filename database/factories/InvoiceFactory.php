<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Models\Customer;
use App\Models\DocStyle;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Invoice>
 */
class InvoiceFactory extends Factory
{
    protected $model = Invoice::class;

    public function definition(): array
    {
        $start = Carbon::now()->subMonths(4)->startOfMonth();
        $end = Carbon::now()->endOfMonth();

        $startdue = Carbon::now()->startOfMonth();
        $enddue = Carbon::now()->addMonth(3)->endOfMonth();
        
        return [
            'invoice_date' => $this->faker->dateTimeBetween($start, $end),
            'total_amount' => $this->faker->randomFloat(2, 50, 10000), // Random amount between 50 and 10,000
            'status' => $this->faker->randomElement(['pending', 'approved', 'denied']),
            'payment_status' => $this->faker->randomElement(['pending', 'paid', 'cancelled']),
            'notes' => $this->faker->text(200),
            'due_date' => $this->faker->dateTimeBetween($startdue, $enddue),
            'payment_method' => $this->faker->randomElement(['Credit Card', 'Bank Transfer', 'Cash']),
            'tax' => $this->faker->randomFloat(2, 0, 20), // Tax rate between 0 and 20
            'customer_id' => Customer::factory(), 
            'doc_style_id' => DocStyle::factory(), 
        ];
    }
}
