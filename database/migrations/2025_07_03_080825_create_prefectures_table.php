<?php

/**
 * Create prefectures table migrations
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
        Schema::create('prefectures', function (Blueprint $table) {
            $table->id();
            $table->string('name', 45);
            $table->string('display_name', 45);
            $table->unsignedBigInteger('area_id');
            $table->timestamps();

            // Index for foreign key
            $table->index('area_id', 'fx_prefectures_areas1_idx');
        });

        // Set AUTO_INCREMENT to start at 48 (optional)
        DB::statement('ALTER TABLE prefectures AUTO_INCREMENT = 48');

        // Add foreign key constraint
        Schema::table('prefectures', function (Blueprint $table) {
            $table->foreign('area_id', 'fx_prefectures_areas1')
                  ->references('id')->on('areas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prefectures', function (Blueprint $table) {
            $table->dropForeign('fx_prefectures_areas1');
        });

        Schema::dropIfExists('prefectures');
    }
};
