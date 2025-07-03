<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrefecturesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('prefectures')->insert([
            [
                'id' => 1,
                'name' => 'hokkaido',
                'display_name' => '北海道',
                'area_id' => 1
            ],
            [
                'id' => 2,
                'name' => 'aomori',
                'display_name' => '青森県',
                'area_id' => 2
            ],
            [
                'id' => 3,
                'name' => 'iwate',
                'display_name' => '岩手県',
                'area_id' => 2
            ],
            [
                'id' => 4,
                'name' => 'miyagi',
                'display_name' => '宮城県',
                'area_id' => 2
            ],
            [
                'id' => 5,
                'name' => 'akita',
                'display_name' => '秋田県',
                'area_id' => 2
            ],
            [
               'id' => 6,
                'name' => 'yamagta',
                'display_name' => '山形県',
                'area_id' => 2
            ],
            [
                'id' => 7,
                'name' => 'fukushima',
                'display_name' => '福島県',
                'area_id' => 2
            ],
            [
                'id' => 8,
                'name' => 'ibaraki',
                'display_name' => '茨城県',
                'area_id' => 3
            ],
            [
                'id' => 9,
                'name' => 'tochigi',
                'display_name' => '栃木県',
                'area_id' => 3
            ],
            [
                'id' => 10,
                'name' => 'gunma',
                'display_name' => '群馬県',
                'area_id' => 3
            ],
            [
                'id' => 11,
                'name' => 'saitama',
                'display_name' => '埼玉県',
                'area_id' => 3
            ],
            [
                'id' => 12,
                'name' => 'chiba',
                'display_name' => '千葉県',
                'area_id' => 3
            ],
            [
                'id' => 13,
                'name' => 'tokyo',
                'display_name' => '東京都',
                'area_id' => 3
            ],
            [
                'id' => 14,
                'name' => 'kanagawa',
                'display_name' => '神奈川県',
                'area_id' => 3
            ],
            [
                'id' => 15,
                'name' => 'niigata',
                'display_name' => '新潟県',
                'area_id' => 4
            ],
            [
                'id' => 16,
                'name' => 'toyoma',
                'display_name' => '富山県',
                'area_id' => 4
            ],
            [
                'id' => 17,
                'name' => 'ishikawa',
                'display_name' => '石川県',
                'area_id' => 4
            ],
            [
                'id' => 18,
                'name' => 'fukui',
                'display_name' => '福井県',
                'area_id' => 4
            ],
            [
                'id' => 19,
                'name' => 'yamanashi',
                'display_name' => '山梨県',
                'area_id' => 4
            ],
            [
                'id' => 20,
                'name' => 'nagano',
                'display_name' => '長野県',
                'area_id' => 4
            ],
            [
                'id' => 21,
                'name' => 'gifu',
                'display_name' => '岐阜県',
                'area_id' => 4
            ],
            [
                'id' => 22,
                'name' => 'shizuoka',
                'display_name' => '静岡県',
                'area_id' => 4
            ],
            [
                'id' => 23,
                'name' => 'aichi',
                'display_name' => '愛知県',
                'area_id' => 4
            ],
            [
                'id' => 24,
                'name' => 'mie',
                'display_name' => '三重県',
                'area_id' => 5
            ],
            [
                'id' => 25,
                'name' => 'shiga',
                'display_name' => '滋賀県',
                'area_id' => 5
            ],
            [
                'id' => 26,
                'name' => 'kyoto',
                'display_name' => '京都府',
                'area_id' => 5
            ],
            [
                'id' => 27,
                'name' => 'osaka',
                'display_name' => '大阪府',
                'area_id' => 5
            ],
            [
                'id' => 28,
                'name' => 'hyogo',
                'display_name' => '兵庫県',
                'area_id' => 5
            ],
            [
                'id' => 29,
                'name' => 'nara',
                'display_name' => '奈良県',
                'area_id' => 5
            ],
            [
                'id' => 30,
                'name' => 'wakayama',
                'display_name' => '和歌山県',
                'area_id' => 5
            ],
            [
                'id' => 31,
                'name' => 'tottori',
                'display_name' => '鳥取県',
                'area_id' => 6
            ],
            [
                'id' => 32,
                'name' => 'shimane',
                'display_name' => '島根県',
                'area_id' => 6
            ],
            [
                'id' => 33,
                'name' => 'okayama',
                'display_name' => '岡山県',
                'area_id' => 6
            ],
            [
                'id' => 34,
                'name' => 'hiroshima',
                'display_name' => '広島県',
                'area_id' => 6
            ],
            [
                'id' => 35,
                'name' => 'yamaguchi',
                'display_name' => '山口県',
                'area_id' => 6
            ],
            [
                'id' => 36,
                'name' => 'tokushima',
                'display_name' => '徳島県',
                'area_id' => 7
            ],
            [
                'id' => 37,
                'name' => 'kagawa',
                'display_name' => '香川県',
                'area_id' => 7
            ],
            [
                'id' => 38,
                'name' => 'ehime',
                'display_name' => '愛媛県',
                'area_id' => 7
            ],
            [
                'id' => 39,
                'name' => 'kouchi',
                'display_name' => '高知県',
                'area_id' => 7
            ],
            [
                'id' => 40,
                'name' => 'fukuoka',
                'display_name' => '福岡県',
                'area_id' => 8
            ],
            [
                'id' => 41,
                'name' => 'saga',
                'display_name' => '佐賀県',
                'area_id' => 8
            ],
            [
                'id' => 42,
                'name' => 'nagasaki',
                'display_name' => '長崎県',
                'area_id' => 8
            ],
            [
                'id' => 43,
                'name' => 'kumamoto',
                'display_name' => '熊本県',
                'area_id' => 8
            ],
            [
                'id' => 44,
                'name' => 'oita',
                'display_name' => '大分県',
                'area_id' => 8
            ],
            [
                'id' => 45,
                'name' => 'miyazaki',
                'display_name' => '大分県',
                'area_id' => 8
            ],
            [
                'id' => 46,
                'name' => 'kagoshima',
                'display_name' => '鹿児島県',
                'area_id' => 8
            ],
            [
                'id' => 47,
                'name' => 'okinawa',
                'display_name' => '沖縄県',
                'area_id' => 8
            ]
        ]);
    }
}
