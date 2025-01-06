<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 5, 500), // Random price between 5 and 500
            'stock_quantity' => $this->faker->numberBetween(0, 1000),
            'category' => $this->faker->randomElement([
                'Categorie 1',
                'Categorie 2',
                'Categorie 3',
                'Categorie 4',
                'Categorie 5',
            ]),
        ];
    }
}
