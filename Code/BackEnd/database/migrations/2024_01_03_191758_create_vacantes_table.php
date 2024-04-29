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
        Schema::create('vacantes', function (Blueprint $table) {
            $table->id();
            $table->text('titulo');
            $table->unsignedBigInteger('Id_empresa'); // Foreign key
            $table->text('descripcion');
            $table->date('fecha_cierre');
            $table->boolean('aceptada')->default(false); // 0 or 1, default is 0
            $table->boolean('visible')->default(true);  // 0 or 1, default is 1
            $table->boolean('practicas')->default(false); // 0 or 1, default is 0
            $table->boolean('laboral')->default(false); // 0 or 1, default is 0
            $table->boolean('pending')->default(false);// 0 or 1, default is 0
            $table->timestamps();
    
            // Foreign key constraints
            $table->foreign('Id_empresa')->references('id')->on('empresas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacantes');
    }
};
