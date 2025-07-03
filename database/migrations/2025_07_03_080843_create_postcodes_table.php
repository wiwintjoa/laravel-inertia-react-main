<?php

/**
 * Create postcodes table migrations
 * Date: 03/07/2025
 * By: Wiwin
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('postcodes', function (Blueprint $table) {
            $table->id();
            $table->string('public_body_code', 5);
            $table->string('old_postcode', 5);
            $table->string('postcode', 7);
            $table->string('prefecture_kana', 100);
            $table->string('city_kana', 100);
            $table->string('local_kana', 100)->nullable();
            $table->string('prefecture', 100);
            $table->string('city', 100);
            $table->string('local', 100)->nullable();
            $table->boolean('indicator_1');
            $table->boolean('indicator_2');
            $table->boolean('indicator_3');
            $table->boolean('indicator_4');
            $table->boolean('indicator_5');
            $table->boolean('indicator_6');

            // Indexes
            $table->index('postcode');
            $table->index('city_kana');
            $table->index('city');
            $table->index('prefecture_kana');
            $table->index('prefecture');
            $table->index('local_kana');
            $table->index('local');
            $table->index(['prefecture', 'city', 'local'], 'idx_prefecture_city_local');
        });

        DB::statement('ALTER TABLE postcodes AUTO_INCREMENT = 124185;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('postcodes');
    }
};
