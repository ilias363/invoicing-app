<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    protected $fillable = [
        'invoice_date',
        'total_amount',
        'status',
        'payment_status',
        'notes',
        'due_date',
        'payment_method',
        'tax',
        'customer_id',
        'doc_style_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    public function docStyle()
    {
        return $this->belongsTo(DocStyle::class, 'doc_style_id', 'id');
    }

    public function logs()
    {
        return $this->hasMany(Log::class, 'invoice_id', 'id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'invoice_product', 'invoice_id', 'product_id');
    }
}
