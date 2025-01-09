<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels, SerializesModels;

    public $invoice_id;
    public $customer_name;
    public $pdfBuffer;

    /**
     * Create a new message instance.
     */
    public function __construct($invoice_id, $customer_name, $pdfBuffer)
    {
        $this->invoice_id = $invoice_id;
        $this->pdfBuffer = $pdfBuffer;
        $this->customer_name = $customer_name;
    }

    public function build()
    {
        return $this->subject('Your Invoice')
            ->view('emails.invoice')
            ->attachData($this->pdfBuffer, 'INV-' . str_pad($this->invoice_id, 4, '0', STR_PAD_LEFT) . '.pdf', [
                'mime' => 'application/pdf',
            ]);
    }
}
