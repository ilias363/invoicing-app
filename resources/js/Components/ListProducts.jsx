import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { router, usePage } from "@inertiajs/react";
import FlashMessage from "./FlashMessage";

const ListProducts = ({
    products,
    pages,
    searchTerm,
    onSortChange,
    sortBy,
    sortDirection,
}) => {
    const [openProductId, setOpenProductId] = useState(null);

    const { auth } = usePage().props;

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

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            router.delete(route("admin.products.destroy", id));
        }
    };

    const toggleActionsMenu = (productId) => {
        setOpenProductId(openProductId === productId ? null : productId);
    };

    return (
        <div className="bg-white shadow-lg rounded-xl py-6 px-10 mb-8">
            <FlashMessage />
            <table className="w-full text-center border-collapse border-2 border-gray-200">
                <thead className="bg-gray-300 whitespace-nowrap">
                    <tr className="text-lg font-semibold text-gray-600">
                        <th
                            className="border px-6 py-3 cursor-pointer"
                            onClick={() => handleSortChange("id")}
                        >
                            Product ID
                            {sortBy === "id" &&
                                (sortDirection === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            className="border px-6 py-3 cursor-pointer"
                            onClick={() => handleSortChange("name")}
                        >
                            Product Name
                            {sortBy === "name" &&
                                (sortDirection === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            className="border px-6 py-3 cursor-pointer"
                            onClick={() => handleSortChange("category")}
                        >
                            Category
                            {sortBy === "category" &&
                                (sortDirection === "asc" ? "↑" : "↓")}
                        </th>
                        <th className="border px-6 py-3">Description</th>
                        <th
                            className="border px-6 py-3 cursor-pointer"
                            onClick={() => handleSortChange("price")}
                        >
                            Price
                            {sortBy === "price" &&
                                (sortDirection === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            className="border px-6 py-3 cursor-pointer"
                            onClick={() => handleSortChange("discount")}
                        >
                            Discount %
                            {sortBy === "discount" &&
                                (sortDirection === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            className="border px-6 py-3 cursor-pointer"
                            onClick={() => handleSortChange("stock_quantity")}
                        >
                            Stock Qty
                            {sortBy === "stock_quantity" &&
                                (sortDirection === "asc" ? "↑" : "↓")}
                        </th>
                        <th className="border px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className="hover:bg-gray-50 transition duration-200"
                        >
                            <td className="border px-6 py-4 text-gray-800">
                                {product.id}
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                {product.name}
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                {product.category}
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                {product.description}
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                {product.price} MAD
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                {product.discount}
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                {product.stock_quantity}
                            </td>
                            <td className="border px-6 py-4 text-center">
                                <button
                                    onClick={() =>
                                        toggleActionsMenu(product.id)
                                    }
                                    className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                >
                                    <FaEllipsisH size={25} />
                                </button>

                                {openProductId === product.id && (
                                    <div
                                        className="absolute w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        <div className="py-1">
                                            <a
                                                href={`/${auth.user.role.name}/products/${product.id}/edit`}
                                                className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Edit
                                            </a>
                                            {auth.user.role.name ===
                                                "admin" && (
                                                <a
                                                    onClick={() => {
                                                        handleDelete(
                                                            product.id
                                                        );
                                                    }}
                                                    className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem"
                                                >
                                                    Delete
                                                </a>
                                            )}
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
                                    ? "text-gray-600 pointer-events-none"
                                    : ""
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

export default ListProducts;
