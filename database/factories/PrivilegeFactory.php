<?php

namespace Database\Factories;

use App\Models\Privilege;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Privilege>
 */
class PrivilegeFactory extends Factory
{
    // Specify the model the factory is for
    protected $model = Privilege::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Manage Users',
                'View Invoices',
                'Edit Invoices',
                'Manage Invoices',
                'Create Sales Order',
                'View Sales Orders',
                'View Financial Records',
                'Approve Invoices',
                'Manage Roles',
            ]),
        ];
    }
}
