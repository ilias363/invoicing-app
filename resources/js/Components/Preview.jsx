import React, { useState } from "react";
import { router, usePage, useForm } from "@inertiajs/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toWords } from "number-to-words";
import FlashMessage from "./FlashMessage";

const Preview = ({ company, invoice, docStyle, fonts }) => {
    const { auth, flash } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    console.log(docStyle);

    const { data, setData, post, processing, errors } = useForm({
        font_family: docStyle.font_family,
        title_color: docStyle.title_color,
        table_head_color: docStyle.table_head_color,
        bg_color: docStyle.bg_color,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleDocStyleSubmit = (e) => {
        e.preventDefault();
        post(`/${auth.user.role.name}/invoices/${invoice.id}/doc-style`);
    };

    // Generate PDF
    const generatePDF = (sendByEmail = false) => {
        const content = document.getElementById("invoice-preview");
        const options = { scale: sendByEmail ? 1 : 3 };

        setIsLoading(true);

        html2canvas(content, options)
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const imgWidth = 210; // A4 width in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
                sendByEmail
                    ? sendEmailToBackend(pdf.output("datauristring"))
                    : pdf.save(
                          `INV-${invoice.id.toString().padStart(4, "0")}.pdf`
                      );
            })
            .catch((err) => {
                flash.error =
                    "An error occurred while generating the PDF. Please try again.";
                console.error("PDF generation error:", err);
            })
            .finally(() => setIsLoading(false));
    };

    const sendEmailToBackend = (pdfBase64) => {
        router.post(`/${auth.user.role.name}/invoices/send-invoice`, {
            pdfBase64: pdfBase64,
            invoice_id: invoice.id,
            customer_name:
                invoice.customer.last_name + " " + invoice.customer.first_name,
            email: invoice.customer.email,
        });
    };

    // Calculate totals
    const subtotal = invoice.products.reduce((acc, product) => {
        const productTotal =
            product.pivot.quantity *
            product.price *
            (1 - product.discount / 100);
        return acc + productTotal;
    }, 0);

    const taxAmount = (subtotal * company.tax_rate) / 100;

    const total = subtotal + taxAmount;

    // Function to convert amounts to words
    const numberToWords = (number) => {
        return toWords(number).replace(/,/g, "");
    };

    return (
        <div className="flex w-full">
            <div className="w-[20%] bg-gray-100 p-4 border-r overflow-y-auto fixed h-full flex flex-col">
                <form onSubmit={handleDocStyleSubmit}>
                    <div className="flex justify-between mb-4">
                        <h2 className="text-lg font-bold">Configure Layout</h2>
                        <button
                            type="submit"
                            className="px-2 py-1 bg-[#2A2A2A] text-white rounded hover:bg-blue-700"
                            disabled={processing}
                        >
                            Save Layout
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-1">
                            Title Color
                        </label>
                        <input
                            type="color"
                            name="title_color"
                            value={data.title_color}
                            onChange={handleChange}
                            className="w-full h-10 p-1"
                        />
                        {errors.title_color && (
                            <p className="text-red-500 text-sm">
                                {errors.title_color.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-1">
                            Table Header Color
                        </label>
                        <input
                            type="color"
                            name="table_head_color"
                            value={data.table_head_color}
                            onChange={handleChange}
                            className="w-full h-10 p-1"
                        />
                        {errors.table_head_color && (
                            <p className="text-red-500 text-sm">
                                {errors.table_head_color.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Font</label>
                        <select
                            name="font_family"
                            value={data.font_family}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        >
                            {fonts.map((font) => {
                                const fontName = font.split(",")[0];
                                return (
                                    <option key={font} value={font}>
                                        {fontName}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.font_family && (
                            <p className="text-red-500 text-sm">
                                {errors.font_family.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-1">
                            Background Color
                        </label>
                        <input
                            type="color"
                            name="bg_color"
                            value={data.bg_color}
                            onChange={handleChange}
                            className="w-full h-10 p-1"
                        />
                        {errors.bg_color && (
                            <p className="text-red-500 text-sm">
                                {errors.bg_color.message}
                            </p>
                        )}
                    </div>
                </form>

                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="text-white text-xl">
                            Generating PDF...
                        </div>
                        <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin ml-4"></div>
                    </div>
                )}

                <button
                    onClick={() => generatePDF(false)}
                    className="mt-4 px-4 py-2 bg-[#2A2A2A] text-white rounded hover:bg-blue-700"
                >
                    Download PDF
                </button>

                {auth.user.role.name === "admin" &&
                    invoice.status === "approved" && (
                        <button
                            onClick={() => generatePDF(true)}
                            className="my-4 px-4 py-2 bg-[#2A2A2A] text-white rounded hover:bg-blue-700"
                        >
                            Send by Email
                        </button>
                    )}
            </div>

            <main className="flex-1 p-6 ml-72">
                <FlashMessage />
                <h1 className="text-3xl text-center font-bold mb-4 underline">
                    Invoice Preview
                </h1>
                <div
                    id="invoice-preview"
                    className="p-6 border rounded-lg bg-white mx-auto w-[210mm] h-[297mm]"
                    style={{
                        fontFamily: data.font_family,
                        backgroundColor: data.bg_color,
                    }}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-5">
                        <img
                            src={`data:image/png;base64,${company.logo}`}
                            alt="Company Logo"
                            className="max-h-20 mr-4"
                        />
                        <div className="text-right">
                            <p>{company.name}</p>
                            <p>{company.address}</p>
                            <p>{company.email}</p>
                            <p>{company.phone}</p>
                            <p>Tax ID: {company.tax_id}</p>
                        </div>
                    </div>

                    {/* Invoice Title */}
                    <div className="text-right mb-5">
                        <h1
                            className="text-3xl font-bold"
                            style={{ color: data.title_color }}
                        >
                            Invoice{" "}
                            {`INV-${invoice.id.toString().padStart(4, "0")}`}
                        </h1>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4 border rounded p-4 mb-5">
                        <div>
                            <p className="font-semibold">Invoice Date</p>
                            <p>{invoice.invoice_date}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Due Date</p>
                            <p>{invoice.due_date}</p>
                        </div>
                    </div>

                    {/* Customer */}
                    <div className="text-left mb-5">
                        <p>{`${invoice.customer.last_name} ${invoice.customer.first_name}`}</p>
                        <p>{invoice.customer.address}</p>
                        <p>{invoice.customer.email}</p>
                        <p>{invoice.customer.phone}</p>
                    </div>

                    {/* Product/Service Table */}
                    <table className="w-full border-collapse border mb-5 whitespace-nowrap">
                        <thead>
                            <tr
                                style={{
                                    backgroundColor: data.table_head_color,
                                    color: "#FFF",
                                }}
                            >
                                <th className="text-left p-2 border">
                                    Product Name
                                </th>
                                <th className="text-right p-2 border">
                                    QUANTITY
                                </th>
                                <th className="text-right p-2 border">
                                    UNIT PRICE
                                </th>
                                <th className="text-right p-2 border">
                                    DISCOUNT
                                </th>
                                <th className="text-right p-2 border">
                                    AMOUNT
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.products.map((product, index) => (
                                <tr key={index}>
                                    <td className="p-2 border">
                                        {product.name}
                                    </td>
                                    <td className="text-right p-2 border">
                                        {product.pivot.quantity}
                                    </td>
                                    <td className="text-right p-2 border">
                                        {product.price.toFixed(2)} DH
                                    </td>
                                    <td className="text-right p-2 border">
                                        {product.discount.toFixed(2)} %
                                    </td>
                                    <td className="text-right p-2 border">
                                        {(
                                            product.pivot.quantity *
                                            product.price *
                                            (1 - product.discount / 100)
                                        ).toFixed(2)}{" "}
                                        DH
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-right p-2 border font-semibold"
                                >
                                    Untaxed Amount
                                </td>
                                <td className="text-right p-2 border font-semibold">
                                    {subtotal.toFixed(2)} DH
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-right p-2 border font-semibold"
                                >
                                    Tax {company.tax_rate}%
                                </td>
                                <td className="text-right p-2 border font-semibold">
                                    {taxAmount.toFixed(2)} DH
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-right p-2 border font-semibold"
                                >
                                    Total Amount
                                </td>
                                <td className="text-right p-2 border font-semibold">
                                    {total.toFixed(2)} DH
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Amount in Words */}
                    <p className="text-right font-semibold">
                        Total Amount in Words: {numberToWords(total)}
                    </p>

                    {/* Notes */}
                    <div className="mt-5">
                        <p>
                            <strong>Notes:</strong> {invoice.notes}
                        </p>
                        <div className="mt-5 text-center border-t pt-2">
                            <p>Contact us: {company.email}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Preview;
