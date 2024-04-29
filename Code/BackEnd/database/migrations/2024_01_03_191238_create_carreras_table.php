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
        Schema::create('carreras', function (Blueprint $table) {
            $table->id();
            $table->text('nombre')->nullable();
            $table->binary('logo')->nullable();
            $table->timestamps();
        });
        DB::statement("ALTER TABLE carreras MODIFY logo LONGBLOB");
    }

    public function down(): void
    {
        Schema::dropIfExists('carreras');
    }
};
