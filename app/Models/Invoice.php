<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'invoice_date',
        'total_amount',
        'status',
        'payment_status',
        'notes',
        'due_date',
        'is_active',
        'payment_method',
        'tax',
        'customer_id',
        'doc_style_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }

    public function docStyle()
    {
        return $this->belongsTo(DocStyle::class, 'doc_style_id', 'doc_style_id');
    }

    public function logs()
    {
        return $this->hasMany(Log::class, 'log_id', 'log_id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class,'invoice_product', 'invoice_id', 'product_id');
    }
}
