<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
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

    protected $hidden = [
        'password',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id', 'role_id');
    }

    public function logs()
    {
        return $this->hasMany(Log::class, 'log_id', 'log_id');
    }
}
