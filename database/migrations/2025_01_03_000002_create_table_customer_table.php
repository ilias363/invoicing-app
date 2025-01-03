<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('customer', function (Blueprint $table) {
            $table->id('customer_id');
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('phone', 20)->nullable();
            $table->text('address')->nullable();
            $table->string('email', 255)->unique();
        });
    }

    public function down(): void {
        Schema::dropIfExists('customer');
    }
};
