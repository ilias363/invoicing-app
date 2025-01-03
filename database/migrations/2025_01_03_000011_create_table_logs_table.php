<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('logs', function (Blueprint $table) {
            $table->id('log_id');
            $table->dateTime('time_activity');
            $table->string('action', 255);
            $table->foreignId('account_id')->references('account_id')->on('user_account')->onDelete('cascade');
            $table->foreignId('invoice_id')->references('invoice_id')->on('invoice')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('logs');
    }
};

