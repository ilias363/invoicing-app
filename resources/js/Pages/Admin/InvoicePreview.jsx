import React from "react";
import Header from "@/Components/Header";
import Preview from "@/Components/Preview";

const InvoicePreview = () => {
    const invoiceData = {
        invoiceNumber: "INV-001",
        invoiceDate: "2025-01-06",
        dueDate: "2025-01-20",
        client: {
            name: "Mohammed Ilias",
            address: "123 Rue Principale, Casablanca",
            email: "med.ilias@example.com",
        },
        company: {
            name: "Moroccan Business Solutions",
            address: "456 Bernoussi, Casablanca",
            country: "Maroc",
            taxId: "MA123456789",
            logoUrl: "/logo_no_bg.png",
        },
        items: [
            { description: "Produit 1", quantity: 2, unitPrice: 50 },
            { description: "Produit 2", quantity: 1, unitPrice: 30 },
        ],
        taxRate: 20,
        discount: 10,
        note: "Merci de régler cette facture avant la date d'échéance.",
    };

    const docStyle = {
        titleColor: "#5C3D64",
        tableColor: "#000000",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#F9F9F9",
        footer: "Contactez-nous : contact@example.com",
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#DCDCDC]">
            <Header />
            <div className="flex flex-row items-center justify-center w-full">
                <Preview invoiceData={invoiceData} docStyle={docStyle} />
            </div>
        </div>
    );
};

export default InvoicePreview;
