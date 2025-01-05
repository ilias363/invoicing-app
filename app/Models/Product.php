<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock_quantity',
        'category',
        'is_active',
    ];

    public function invoices()
    {
        return $this->belongsToMany(Invoice::class,'invoice_product', 'product_id', 'invoice_id');
    }
}
