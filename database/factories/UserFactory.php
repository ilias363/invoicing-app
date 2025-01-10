<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $data = json_decode(file_get_contents(storage_path('app/moroccan_names.json')), true);

        $firstName = $this->faker->randomElement($data['first_names']);
        $lastName = $this->faker->randomElement($data['last_names']);
        $moroccanPhone = '+212 ' . $this->faker->numberBetween(600, 799) . '-' . $this->faker->numberBetween(100000, 999999);

        $domain = 'gmail.ma';
        $email = strtolower($firstName . '.' . str_replace(' ', '', $lastName) . '@' . $domain);

        return [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'phone' => $moroccanPhone,
            'password' => Hash::make('password'),
            'last_login' => null,
            'failed_attempts' => 0,
            'account_status' => $this->faker->randomElement(['active', 'inactive', 'suspended', 'closed']),
            'role_id' => Role::inRandomOrder()->first()->id,
        ];
    }
}
