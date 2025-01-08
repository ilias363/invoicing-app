import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

const ListInvoices = ({
    invoices,
    pages,
    searchTerm,
    onSortChange,
    sortBy,
    sortDirection,
}) => {
    const [openInvoiceId, setOpenInvoiceId] = useState(null);

    const makeUrlWithParams = (url) => {
        if (searchTerm !== null) url += "&search=" + searchTerm;
        if (sortBy !== null) url += "&sortBy=" + sortBy;
        if (sortDirection !== null) url += "&sortDirection=" + sortDirection;

        return url;
    };

    const handleSortChange = (newSortBy) => {
        let newSortDirection = sortDirection;

        if (newSortBy === sortBy) {
            newSortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
            newSortDirection = "desc";
        }

        onSortChange(newSortBy, newSortDirection);
    };

    const toggleActionsMenu = (invoiceId) => {
        setOpenInvoiceId(openInvoiceId === invoiceId ? null : invoiceId);
    };

    return (
        <div className="bg-white shadow-lg rounded-xl py-6 px-10 mb-8">
            <table className="w-full text-center border-collapse border-2 border-gray-200">
                <thead className="bg-gray-300 whitespace-nowrap">
                    <tr className="text-lg font-semibold text-gray-600">
                        <th
                            className="border px-6 py-3 cursor-pointer"
                            onClick={() => handleSortChange("id")}
                        >
                            Invoice ID{" "}
                            {sortBy === "id" &&
                                (sortDirection === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            className="border px-6 py-3 cursor-pointer"
                            onClick={() => handleSortChange("customer_name")}
                        >
                            Customer{" "}
                            {sortBy === "customer_name" &&
                                (sortDirection === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            className="border px-6 py-3 cursor-pointer"
                            onClick={() => handleSortChange("total_amount")}
                        >
                            Total Amount{" "}
                            {sortBy === "total_amount" &&
                                (sortDirection === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            className="border px-6 py-3 cursor-pointer"
                            onClick={() => handleSortChange("status")}
                        >
                            Status{" "}
                            {sortBy === "status" &&
                                (sortDirection === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            className="border px-6 py-3 cursor-pointer"
                            onClick={() => handleSortChange("payment_status")}
                        >
                            Payment Status{" "}
                            {sortBy === "payment_status" &&
                                (sortDirection === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            className="border px-6 py-3 cursor-pointer"
                            onClick={() => handleSortChange("invoice_date")}
                        >
                            Date Created{" "}
                            {sortBy === "invoice_date" &&
                                (sortDirection === "asc" ? "↑" : "↓")}
                        </th>
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
                                {invoice.total_amount.toFixed(2)} MAD
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                <span
                                    className={`inline-block px-3 py-1 rounded-full font-semibold ${
                                        invoice.status === "approved"
                                            ? "bg-green-100 text-green-600"
                                            : invoice.status === "pending"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {invoice.status}
                                </span>
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                <span
                                    className={`inline-block px-3 py-1 rounded-full font-semibold ${
                                        invoice.payment_status === "paid"
                                            ? "bg-green-100 text-green-600"
                                            : invoice.payment_status ===
                                              "pending"
                                            ? "bg-yellow-100 text-yellow-600"
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
                                    onClick={() =>
                                        toggleActionsMenu(invoice.id)
                                    }
                                    className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                >
                                    <FaEllipsisH size={25} />
                                </button>

                                {openInvoiceId === invoice.id && (
                                    <div
                                        className="absolute w-24 py-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
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
                        href={
                            link.url === null
                                ? "#"
                                : makeUrlWithParams(link.url)
                        }
                        disabled={link.url === null}
                        className={`flex items-center justify-center px-5 py-2 text-md font-medium rounded-lg transition duration-300 ease-in-out hover:bg-blue-300 hover:text-black 
                        ${
                            link.label === "Next &raquo;" ||
                            link.label === "&laquo; Previous"
                                ? link.url === null
                                    ? "bg-gray-400 text-gray-600 pointer-events-none"
                                    : "bg-white"
                                : ""
                        }
                        ${
                            link.active
                                ? "bg-blue-600 text-white"
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
