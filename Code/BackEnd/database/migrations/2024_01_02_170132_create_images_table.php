<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id('id_image');
            $table->string('page');
            $table->string('title')->nullable();
            $table->string('name')->nullable();
            $table->string('component');
            $table->text('text')->nullable();
            $table->string('link')->default('')->nullable();
            $table->binary('image')->nullable();
            $table->integer('orden')->nullable();
            $table->timestamps();
        });
        DB::statement("ALTER TABLE images MODIFY image LONGBLOB");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
