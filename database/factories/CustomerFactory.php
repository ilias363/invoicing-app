<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    public function definition(): array
    {
        $names = json_decode(file_get_contents(storage_path('app/moroccan_names.json')), true);

        $firstName = $this->faker->randomElement($names['first_names']);
        $lastName = $this->faker->randomElement($names['last_names']);
        $moroccanPhone = '+212 ' . $this->faker->numberBetween(600, 799) . '-' . $this->faker->numberBetween(100000, 999999);

        $street = $this->faker->randomElement($names['streets']);
        $city = $this->faker->randomElement($names['cities']);
        $region = $this->faker->randomElement($names['regions']);
        $moroccanAddress = $street . ', ' . $city . ', ' . $region . ', Maroc';

        $domain = 'gmail.ma';
        $email = strtolower($firstName . '.' . str_replace(' ', '', $lastName) . '@' . $domain);

        return [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'phone' => $moroccanPhone,
            'address' => $moroccanAddress,
            'email' => $email,
        ];
    }
}
