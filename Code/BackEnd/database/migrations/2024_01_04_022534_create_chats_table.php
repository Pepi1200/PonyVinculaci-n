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
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->text('pregunta');
            $table->text('respuesta')->nullable();
            $table->timestamps();
        });
        DB::statement('ALTER TABLE chats ADD FULLTEXT INDEX pregunta_ft_idx (pregunta)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chats', function (Blueprint $table) {
            $table->dropIndex('pregunta_ft_idx');
        });
        Schema::dropIfExists('chats');
    }
};
