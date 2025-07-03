<?php

/**
 * Create areas table migrations
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
        Schema::create('areas', function (Blueprint $table) {
            $table->id(); // auto-increments by default
            $table->string('name', 45);
            $table->string('display_name', 45);
        });

        // Set the AUTO_INCREMENT start value to 9
        DB::statement('ALTER TABLE areas AUTO_INCREMENT = 9');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('areas');
    }
};
