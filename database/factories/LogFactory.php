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
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        return [
            'time_action' => $this->faker->dateTimeBetween($startOfWeek, $endOfWeek),
            'action' => $this->faker->sentence(),
            'user_id' => User::factory(),
            'invoice_id' => Invoice::factory(),
        ];
    }
}
