<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $data = json_decode(file_get_contents(storage_path('app/product_data.json')), true);

        $category = $this->faker->randomElement(array_keys($data));

        $name = $this->faker->randomElement($data[$category]);

        $price = match ($category) {
            'Meubles de salon', 'Meubles de chambre', 'Cuisine et salle à manger' => $this->faker->randomFloat(2, 1000, 10000), // Prix plus élevés (MAD)
            'Décoration', 'Salle de bain', 'Rangements' => $this->faker->randomFloat(2, 100, 2000), // Articles abordables (MAD)
            'Bureau et multimédia' => $this->faker->randomFloat(2, 500, 5000), // Prix moyens (MAD)
            'Extérieur' => $this->faker->randomFloat(2, 300, 6000), // Prix variables (MAD)
            'Enfants' => $this->faker->randomFloat(2, 200, 3000), // Prix adaptés aux enfants (MAD)
            'Électroménager et accessoires' => $this->faker->randomFloat(2, 500, 10000), // Électroménager haut de gamme
            default => $this->faker->randomFloat(2, 100, 5000), // Valeurs par défaut (MAD)
        };

        $stock_quantity = match ($category) {
            'Meubles de salon', 'Meubles de chambre', 'Cuisine et salle à manger' => $this->faker->numberBetween(1, 20), // Produits volumineux, stock limité
            'Décoration', 'Salle de bain', 'Rangements' => $this->faker->numberBetween(10, 200), // Articles fréquents
            'Bureau et multimédia', 'Extérieur' => $this->faker->numberBetween(5, 50), // Articles moyens
            'Enfants' => $this->faker->numberBetween(10, 100), // Articles pour enfants
            'Électroménager et accessoires' => $this->faker->numberBetween(1, 50), // Articles coûteux
            default => $this->faker->numberBetween(1, 50), // Valeurs par défaut
        };

        return [
            'name' => $name,
            'description' => $this->faker->paragraph,
            'price' => $price, // Prix ajusté pour MAD
            'discount' => $this->faker->randomFloat(2, 0, 30), // Remise aléatoire
            'stock_quantity' => $stock_quantity, // Stock ajusté
            'category' => $category,
        ];
    }
}
