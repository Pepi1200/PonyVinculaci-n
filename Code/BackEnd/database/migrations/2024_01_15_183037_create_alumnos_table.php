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
        Schema::create('alumnos', function (Blueprint $table) {
            $table->id();
            $table->string('numero_control')->unique();;
            $table->string('correo')->nullable();
            $table->text('nombre')->nullable();
            $table->text('apellido_paterno')->nullable();
            $table->text('apellido_materno')->nullable();
            $table->text('linkedin')->nullable();
            $table->text('telefono')->nullable();
            $table->binary('foto_perfil')->nullable();
            $table->text('password');
            $table->integer('color')->nullable();
            $table->timestamps();
        });
        DB::statement("ALTER TABLE alumnos MODIFY foto_perfil LONGBLOB");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alumnos');
    }
};
