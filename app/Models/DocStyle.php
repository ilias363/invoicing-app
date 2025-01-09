<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocStyle extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'font_family',
        'title_color',
        'table_head_color',
        'bg_color',
    ];

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'doc_style_id', 'id');
    }
}
