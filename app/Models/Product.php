<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock_quantity',
        'category',
    ];

    public function invoices()
    {
        return $this->belongsToMany(Invoice::class,'invoice_product', 'product_id', 'invoice_id');
    }
}
