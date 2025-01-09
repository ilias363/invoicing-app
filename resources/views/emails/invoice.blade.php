<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Invoice</title>
</head>
<body>
    <p>Dear {{ $invoice->customer->name }},</p>
    <p>Thank you for your purchase. Please find your invoice attached.</p>
    <p>If you have any questions, feel free to contact us.</p>
    <p>Best regards,<br>Invoicing App</p>
</body>
</html>
