<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocStyle extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'layout',
        'font',
        'color1',
        'color2',
        'layout_bg',
        'template_path',
        'is_default',
    ];

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'doc_style_id', 'id');
    }
}
