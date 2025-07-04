<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostCode extends Model
{
    use HasFactory;

    protected $table = 'postcodes';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'public_body_code',
        'old_postcode',
        'postcode',
        'prefecture_kana',
        'city_kana',
        'local_kana',
        'prefecture',
        'city',
        'local',
        'indicator_1',
        'indicator_2',
        'indicator_3',
        'indicator_4',
        'indicator_5',
        'indicator_6',
    ];

    protected $casts = [
        'indicator_1' => 'boolean',
        'indicator_2' => 'boolean',
        'indicator_3' => 'boolean',
        'indicator_4' => 'boolean',
        'indicator_5' => 'boolean',
        'indicator_6' => 'boolean',
    ];
}
