import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

const ListInvoices = ({ invoices, pages }) => {
    const [openInvoiceId, setOpenInvoiceId] = useState(null);

    const toggleActionsMenu = (invoiceId) => {
        setOpenInvoiceId(openInvoiceId === invoiceId ? null : invoiceId);
    };

    return (
        <div className="bg-white shadow-lg rounded-xl py-6 px-10 mb-8">
            <table className="w-full text-center table-auto border-collapse border-2 border-gray-200">
                <thead className="bg-gray-300">
                    <tr className="text-lg font-semibold text-gray-600">
                        <th className="border px-6 py-3">Invoice ID</th>
                        <th className="border px-6 py-3">Customer</th>
                        <th className="border px-6 py-3">Total Amount</th>
                        <th className="border px-6 py-3">Status</th>
                        <th className="border px-6 py-3">Payment Status</th>
                        <th className="border px-6 py-3">Date Created</th>
                        <th className="border px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr
                            key={invoice.id}
                            className="hover:bg-gray-50 transition duration-200"
                        >
                            <td className="border px-6 py-4 text-gray-800">
                                {invoice.id}
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                {invoice.customer.last_name}{" "}
                                {invoice.customer.first_name}
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                {invoice.total_amount} MAD
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                <span
                                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                        invoice.status === "Paid"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-600"
                                    }`}
                                >
                                    {invoice.status}
                                </span>
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                <span
                                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                        invoice.payment_status === "Paid"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {invoice.payment_status}
                                </span>
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                {invoice.invoice_date}
                            </td>
                            <td className="border px-6 py-4 text-center">
                                <button
                                    onClick={() => toggleActionsMenu(invoice.id)}
                                    className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                >
                                    <FaEllipsisH size={25} />
                                </button>

                                {openInvoiceId === invoice.id && (
                                    <div
                                        className="absolute w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        <div className="py-1">
                                            <a
                                                href="#"
                                                className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                View
                                            </a>
                                            <a
                                                href="#"
                                                className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Edit
                                            </a>
                                            <a
                                                href="#"
                                                className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Delete
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center items-center space-x-2 mt-6">
                {pages.map((link, index) => (
                    <a
                        key={index}
                        href={link.url || "#"}
                        disabled={link.url === null}
                        className={`flex items-center justify-center px-5 py-2 text-md font-medium rounded-lg transition duration-300 ease-in-out 
                        ${
                            link.url === null
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-800"
                        }
                        ${
                            link.active
                                ? "bg-blue-700 text-white"
                                : "bg-transparent border border-gray-300 text-gray-700"
                        }
                    `}
                    >
                        {link.label === "Next &raquo;" ? (
                            <>
                                <span>Next</span>
                                <span className="ml-2">&raquo;</span>
                            </>
                        ) : link.label === "&laquo; Previous" ? (
                            <>
                                <span className="mr-2">&laquo;</span>
                                <span>Previous</span>
                            </>
                        ) : (
                            link.label
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ListInvoices;
