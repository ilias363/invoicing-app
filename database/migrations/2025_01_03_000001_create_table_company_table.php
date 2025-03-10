<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('company', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->text('address')->nullable();
            $table->string('email', 255)->unique();
            $table->string('phone', 20);
            $table->string('tax_id', 10)->nullable();
            $table->double('tax_rate')->min(0)->max(100)->default(0);
            $table->longtext('logo')->nullable();
        });
    }

    public function down(): void {
        Schema::dropIfExists('company');
    }
};
