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
        Schema::create('vinculacions', function (Blueprint $table) {
            $table->id();
            $table->string('correo')->nullable();
            $table->text('nombre')->nullable();
            $table->text('apellido_paterno')->nullable();
            $table->text('apellido_materno')->nullable();
            $table->text('linkedin')->nullable();
            $table->text('telefono')->nullable();
            $table->binary('foto_perfil')->nullable();
            $table->text('password')->nullable();
            $table->text('codigo');
            $table->integer('color')->nullable();
            $table->timestamps();
        });

        DB::statement("ALTER TABLE alumnos MODIFY foto_perfil LONGBLOB");
        DB::table('vinculacions')->insert([
            'codigo' => 'N9TT-9G0A-B7FQ-RANC',
        ]);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vinculacions');
    }
};
