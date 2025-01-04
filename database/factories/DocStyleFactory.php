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
            'layout' => $this->faker->word,
            'font' => $this->faker->word,
            'color1' => $this->faker->hexColor,
            'color2' => $this->faker->hexColor,
            'layout_bg' => $this->faker->word,
            'template_path' => $this->faker->filePath(),
            'is_default' => $this->faker->boolean,
        ];
    }
}
