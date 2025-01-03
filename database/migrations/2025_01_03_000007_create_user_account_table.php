<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('user_account', function (Blueprint $table) {
            $table->id('account_id');
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('email', 255)->unique();
            $table->string('phone', 20)->nullable();
            $table->string('password_hash', 255);
            $table->dateTime('last_login')->nullable();
            $table->integer('failed_attempts')->default(0);
            $table->string('account_status', 50)->nullable();
            $table->timestamps();
            $table->foreignId('role_id')->references('role_id')->on('role')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('user_account');
    }
};

