<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    protected $table = 'areas';

    protected $fillable = [
        'name',
        'display_name',
    ];

    public $timestamps = false;

    /**
     * Optional: If you want to link prefectures to areas
     */
    public function prefectures()
    {
        return $this->hasMany(Prefecture::class);
    }
}
