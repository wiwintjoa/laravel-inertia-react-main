<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AreasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('areas')->insert([
            [
                'id' => 1,
                'name' => 'hokkaido',
                'display_name' => '北海道'
            ],
            [
                'id' => 2,
                'name' => 'tohoku',
                'display_name' => '東北'
            ],
            [
                'id' => 3,
                'name' => 'kanto',
                'display_name' => '関東'
            ],
            [
                'id' => 4,
                'name' => 'chubu',
                'display_name' => '中部'
            ],
            [
                'id' => 5,
                'name' => 'kinki',
                'display_name' => '近畿'
            ],
            [
                'id' => 6,
                'name' => 'chugoku',
                'display_name' => '中国'
            ],
            [
                'id' => 7,
                'name' => 'shikoku',
                'display_name' => '四国'
            ],
            [
                'id' => 8,
                'name' => 'kyusyu',
                'display_name' => '九州・沖縄'
            ]
        ]);
    }
}
