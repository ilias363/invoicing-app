<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->date('invoice_date');
            $table->double('total_amount');
            $table->enum('status', ['pending', 'approved', 'denied'])->nullable();
            $table->enum('payment_status', ['pending', 'paid', 'cancelled'])->nullable();
            $table->text('notes')->nullable();
            $table->date('due_date')->nullable();
            $table->softDeletes();
            $table->enum('payment_method', ['Credit Card', 'Bank Transfer', 'Cash'])->nullable();
            $table->double('tax')->nullable();
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');
            $table->foreignId('doc_style_id')->nullable()->constrained('doc_styles')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('invoices');
    }
};

