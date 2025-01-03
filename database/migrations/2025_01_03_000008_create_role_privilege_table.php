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
        Schema::create('role_privilege', function (Blueprint $table) {
            $table->foreignId('role_id')->references('role_id')->on('role')->onDelete('cascade');
            $table->foreignId('privilege_id')->references('privilege_id')->on('privilege')->onDelete('cascade');
            $table->primary(['role_id', 'privilege_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_privilege');
    }
};
