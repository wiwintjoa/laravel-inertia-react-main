<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $table = 'companies';

    protected $fillable = [
        'name',
        'email',
        'prefecture_id',
        'phone',
        'postcode',
        'city',
        'local',
        'street_address',
        'business_hour',
        'regular_holiday',
        'image',
        'fax',
        'url',
        'license_number',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

   /**
     * Relationship: Company belongs to a Prefecture
     */
    public function prefecture()
    {
        return $this->belongsTo(Prefecture::class);
    }
}
