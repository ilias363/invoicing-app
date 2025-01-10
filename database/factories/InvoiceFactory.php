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
        $invoiceDate = $this->faker->dateTimeBetween('-4 months', 'now');
        $dueDate = $this->faker->dateTimeBetween($invoiceDate, '+3 months');

        $baseAmount = $this->faker->randomFloat(2, 50, 10000);
        $taxRate = $this->faker->randomFloat(2, 0, 20);
        $taxAmount = round(($baseAmount * $taxRate) / 100, 2);
        $totalAmount = $baseAmount + $taxAmount;

        $statuses = ['pending', 'approved', 'denied'];
        $status = $this->faker->randomElement($statuses);

        $paymentStatuses = [
            'pending' => ['pending', 'cancelled'], 
            'approved' => ['paid', 'pending'], 
            'denied' => ['cancelled']
        ];

        $paymentStatus = $this->faker->randomElement($paymentStatuses[$status]);

        return [
            'invoice_date' => $invoiceDate,
            'due_date' => $dueDate,
            'total_amount' => $totalAmount,
            'status' => $status,
            'payment_status' => $paymentStatus,
            'notes' => $this->faker->optional()->text(200),
            'payment_method' => $this->faker->randomElement(['Credit Card', 'Bank Transfer', 'Cash']),
            'tax' => $taxRate,
            'customer_id' => Customer::factory(), 
            'doc_style_id' => DocStyle::factory(),
        ];
    }
}
