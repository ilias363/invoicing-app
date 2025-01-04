<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('user_accounts', function (Blueprint $table) {
            $table->id('account_id');
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('email', 255)->unique();
            $table->string('phone', 20)->nullable();
            $table->string('password', 255);
            $table->dateTime('last_login')->nullable();
            $table->integer('failed_attempts')->default(0);
            $table->enum('account_status', ['active','inactive','suspended','closed'])->default('active');
            $table->timestamps();
            $table->foreignId('role_id')->references('role_id')->on('roles')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('user_accounts');
    }
};

