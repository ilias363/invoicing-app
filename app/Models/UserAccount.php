<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'password',
        'last_login',
        'failed_attempts',
        'account_status',
        'role_id',
    ];

    protected $casts = [
        'last_login' => 'datetime',
        'failed_attempts' => 'integer',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id', 'role_id');
    }
}
