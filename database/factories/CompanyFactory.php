<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    protected $model = Company::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = 'IKEA';

        if ($name === 'IKEA') {
            $address = 'Zenata, Sidi Bernoussi, Casablanca, Maroc';
            $email = 'contact.ma@ikea.com';
            $phone = '+212 522 79 34 00';
            $taxId = 'TAXMAR001';

            // Path to the image in the public directory
            $imagePath = public_path('ikea_logo.png');
        } else {
            $address = $this->faker->address;
            $email = $this->faker->unique()->safeEmail;
            $phone = $this->faker->phoneNumber;
            $taxId = $this->faker->numerify('TAX###');
            $imagePath = null;
        }

        // Encode the image in Base64 if it exists
        $base64Image = $imagePath && file_exists($imagePath)
            ? base64_encode(file_get_contents($imagePath))
            : null;

        return [
            'name' => $name,
            'address' => $address,
            'email' => $email,
            'phone' => $phone,
            'tax_id' => $taxId,
            'tax_rate' => 20,
            'logo' => $base64Image,
        ];
    }
}



