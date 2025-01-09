<?php

namespace Database\Factories;

use App\Models\DocStyle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DocStyle>
 */
class DocStyleFactory extends Factory
{
    protected $model = DocStyle::class;

    public function definition(): array
    {
        return [ 
            'font_family' => $this->faker->randomElement([
                'Lato, sans-serif',
                'Arial, sans-serif',
                'Times New Roman, sans-serif',
                'Roboto, sans-serif',
            ]),
            'title_color' => $this->faker->hexColor(),
            'table_head_color' => $this->faker->hexColor(),
            'bg_color' => $this->faker->hexColor(),
        ];
    }
}
