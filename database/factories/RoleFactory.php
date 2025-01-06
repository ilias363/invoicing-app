<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\Privilege;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    // Specify the model the factory is for
    protected $model = Role::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['admin', 'accountant', 'salesman']),
        ];
    }

    /**
     * Associate the role with specific privileges.
     */
    public function configure()
    {
        return $this->afterCreating(function (Role $role) {
            switch ($role->name) {
                case 'admin':
                    // Admin gets all privileges
                    $role->privileges()->attach(Privilege::pluck('id'));
                    break;
                case 'accountant':
                    // Accountant gets limited privileges
                    $role->privileges()->attach(Privilege::whereIn('name', [
                        'View Invoices',
                        'Edit Invoices',
                        'Manage Invoices',
                        'View Financial Records',
                    ])->pluck('id'));
                    break;
                case 'salesman':
                    // Salesman gets limited privileges
                    $role->privileges()->attach(Privilege::whereIn('name', [
                        'Create Sales Order',
                        'View Sales Orders',
                    ])->pluck('id'));
                    break;
            }
        });
    }
}
