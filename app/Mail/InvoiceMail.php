<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels, SerializesModels;

    public $invoice_id;
    public $pdfBuffer;

    /**
     * Create a new message instance.
     */
    public function __construct($invoice_id, $pdfBuffer)
    {
        $this->invoice_id = $invoice_id;
        $this->pdfBuffer = $pdfBuffer;
    }

    public function build()
    {
        return $this->subject('Your Invoice')
            ->view('emails.invoice') // You can create an email view if needed
            ->attachData($this->pdfBuffer, 'INV-' . $this->invoice_id . '.pdf', [
                'mime' => 'application/pdf',
            ]);
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Invoice Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'view.name',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
