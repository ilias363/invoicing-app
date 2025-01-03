<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('doc_style', function (Blueprint $table) {
            $table->id('doc_style_id');
            $table->string('layout', 50)->nullable();
            $table->string('font', 50)->nullable();
            $table->string('color1', 50)->nullable();
            $table->string('color2', 50)->nullable();
            $table->string('layout_bg', 50)->nullable();
            $table->text('template_path')->nullable();
            $table->boolean('is_default')->default(false);
        });
    }

    public function down(): void {
        Schema::dropIfExists('doc_style');
    }
};

