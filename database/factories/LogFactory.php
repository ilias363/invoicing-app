<?php

namespace Database\Factories;

use App\Models\Log;
use App\Models\User;
use App\Models\Invoice;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends Factory<Log>
 */
class LogFactory extends Factory
{
    protected $model = Log::class;

    public function definition(): array
    {
        $invoice = Invoice::inRandomOrder()->first();
        $user = User::inRandomOrder()->first();

        $actions = ['CREATED', 'APPROVED', 'DENIED', 'UPDATED', 'DELETED', 'SENT'];

        $action = $this->faker->randomElement($actions);

        $timeAction = $this->faker->dateTimeBetween('-7 days', 'now');

        return [
            'time_action' => $timeAction,
            'action' => 'Invoice number ' . $invoice->id . ' ' . $action . ' by ' . $user->role->name . ' ' . $user->last_name . ' ' . $user->first_name,
            'user_id' => $user->id,
            'invoice_id' => $invoice->id,
        ];
    }
}
