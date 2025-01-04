<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserAccount>
 */
class UserAccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->optional()->phoneNumber,
            'password' => bcrypt('password'), // Default password, replace with hashing logic as needed
            'last_login' => $this->faker->optional()->dateTimeThisYear,
            'failed_attempts' => $this->faker->numberBetween(0, 5),
            'account_status' => $this->faker->randomElement(['active', 'inactive', 'suspended', 'closed']),
            'role_id' => 1, // Replace with dynamic role IDs if needed
        ];
    }
}
