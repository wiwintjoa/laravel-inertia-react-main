<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

class PostcodesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sqlPath = database_path('seeders/sql/postcodes.sql');
        $sql = File::get($sqlPath);

        // Split into chunks by semicolon
        $statements = explode(";", $sql);

        // Loop and run each non-empty chunk
        foreach ($statements as $chunk) {
            $trimmed = trim($chunk);
            if (!empty($trimmed)) {
                DB::unprepared($trimmed . ";");
            }
        }
    }
}
