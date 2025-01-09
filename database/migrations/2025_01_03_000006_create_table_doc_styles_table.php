<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('doc_styles', function (Blueprint $table) {
            $table->id();
            $table->enum('font_family', [
                'Lato, sans-serif',
                'Arial, sans-serif',
                'Times New Roman, sans-serif',
                'Roboto, sans-serif',
            ]);
            $table->string('title_color', 50);
            $table->string('table_head_color', 50);
            $table->string('bg_color', 50);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('doc_styles');
    }
};
