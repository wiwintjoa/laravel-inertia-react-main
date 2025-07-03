<?php

/**
 * Create companies table migrations
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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('email', 255);
            $table->unsignedBigInteger('prefecture_id');
            $table->string('phone', 15)->nullable();
            $table->string('postcode', 7);
            $table->string('city', 255);
            $table->string('local', 255);
            $table->string('street_address', 255)->nullable();
            $table->string('business_hour', 45)->nullable();
            $table->string('regular_holiday', 45)->nullable();
            $table->string('image', 255)->nullable();
            $table->string('fax', 15)->nullable();
            $table->string('url', 255)->nullable();
            $table->string('license_number', 255)->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            // Index
            $table->index('prefecture_id', 'fx_companies_prefectures1_idx');

            // Foreign key
            $table->foreign('prefecture_id', 'fx_companies_prefectures1_idx')
                  ->references('id')
                  ->on('prefectures');
        });

        DB::statement('ALTER TABLE companies AUTO_INCREMENT = 1;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
