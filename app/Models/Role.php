<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'name',
    ];


    /**
     * Define the many-to-many relationship with Privilege.
     */
    public function privileges()
    {
        return $this->belongsToMany(Privilege::class, 'role_privilege', 'role_id', 'privilege_id');
    }
}
