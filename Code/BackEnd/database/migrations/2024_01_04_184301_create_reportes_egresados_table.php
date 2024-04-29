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
        Schema::create('reportes_egresados', function (Blueprint $table) {
            $table->id();
            $table->year('date');
            $table->string('ubicacion')->nullable();
            $table->unsignedBigInteger('id_carrera');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('id_carrera')->references('id')->on('carreras')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reportes_egresados');
    }
};
