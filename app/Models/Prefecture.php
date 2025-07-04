<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prefecture extends Model
{
    use HasFactory;

    protected $table = 'prefectures';

    protected $fillable = [
        'name',
        'display_name',
        'area_id',
    ];

    public $timestamps = false;

    /**
     * Relationship: Prefecture belongs to an Area
     */
    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    /**
     * Optional: If you have companies linked to prefectures
     */
    public function companies()
    {
        return $this->hasMany(Company::class);
    }
}
