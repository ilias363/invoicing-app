<?php

namespace Database\Factories;

use App\Models\Log;
use App\Models\User;
use App\Models\Invoice;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Log>
 */
class LogFactory extends Factory
{
    protected $model = Log::class;

    public function definition(): array
    {
        return [
            'time_action' => $this->faker->dateTime(),
            'action' => $this->faker->sentence(),
            'user_id' => User::factory(),
            'invoice_id' => Invoice::factory(),
        ];
    }
}
