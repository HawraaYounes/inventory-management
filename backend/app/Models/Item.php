<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Item extends Model
{
    use HasFactory;

    protected $fillable = ['product_type_id', 'serial_number', 'is_sold'];

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }
}
