<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('empresas', function (Blueprint $table) {
            $table->id();
            $table->integer('folio')-> unique;
            $table->text('rfc');
            $table->text('nombre_comercial')->nullable();;
            $table->text('razon_social')->nullable();;
            $table->text('tipo_empresa')->nullable();;
            $table->string('sector')->nullable();;
            $table->string('giro')->nullable();;
            $table->integer('numero_empleados')->nullable();;
            $table->text('direccion')->nullable();;
            $table->text('descripcion')->nullable();;
            $table->text('sitio_web')->nullable();;
            $table->text('nombre_encargado')->nullable();;
            $table->text('puesto_encargado')->nullable();;
            $table->string('telefono')->nullable();;
            $table->string('correo');
            $table->binary('logo')->nullable();;
            $table->text('password');
            $table->integer('status');
            $table->integer('color')->nullable();
            $table->timestamps();
        });
        DB::statement("ALTER TABLE empresas MODIFY logo LONGBLOB");
    }

    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};
