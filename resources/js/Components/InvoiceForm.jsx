import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import FlashMessage from "./FlashMessage";

const InvoiceForm = ({
    invoice_data = null,
    customersData,
    productsData,
    taxRate,
    toCreate,
}) => {
    productsData = productsData.map((product) => ({
        ...product,
        init_quantity: 0,
        quantity: 1,
    }));
    console.log(productsData);
    const { auth } = usePage().props;
    const [products, setProducts] = useState([]);
    const [address, setAddress] = useState("");
    const [searchProductTerm, setSearchProductTerm] = useState("");
    const [searchCustomerTerm, setSearchCustomerTerm] = useState("");
    const [openSearchCustomer, setOpenSearchCustomer] = useState(false);

    const { data, setData, post, errors, setError } = useForm(
        toCreate
            ? {
                  customer_id: null,
                  invoice_date: "",
                  due_date: "",
                  payment_method: "Credit Card",
                  notes: "",
                  products: [],
              }
            : {
                  customer_id: invoice_data.customer_id,
                  invoice_date: invoice_data.invoice_date,
                  due_date: invoice_data.due_date,
                  payment_method: invoice_data.payment_method,
                  payment_status: invoice_data.payment_status,
                  notes: invoice_data.notes || "",
                  products: [],
              }
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!data.customer_id) {
            errors.customer_id = "Customer is required.";
        }
        if (!data.invoice_date) {
            errors.invoice_date = "Invoice date is required.";
        }
        if (
            data.due_date &&
            new Date(data.due_date) < new Date(data.invoice_date)
        ) {
            errors.due_date = "Due date cannot be earlier than invoice date.";
        }
        if (data.products.length === 0) {
            errors.products = "At least one product is required.";
        } else {
            data.products.forEach((product) => {
                if (!product.quantity || product.quantity < 1) {
                    errors.products = "Quantity must be at least 1.";
                } else if (
                    toCreate &&
                    product.quantity > product.stock_quantity
                ) {
                    errors.products = `The quantity for product ${product.name} must not exceed the stock quantity (${product.stock_quantity}).`;
                } else if (
                    !toCreate &&
                    product.quantity >
                        product.stock_quantity + product.init_quantity
                ) {
                    errors.products = `The quantity for product ${
                        product.name
                    } must not exceed the stock quantity (${
                        product.stock_quantity + product.init_quantity
                    }).`;
                }
            });
        }
        if (data.notes.length > 500) {
            errors.notes = "Notes must be less than 500 characters";
        }

        setError(errors);

        if (Object.keys(errors).length === 0) {
            toCreate
                ? post(`/${auth.user.role.name}/create-invoice`)
                : post(
                      `/${auth.user.role.name}/invoices/${invoice_data.id}/edit`
                  );
        }
    };

    const addProduct = (selectedProduct) => {
        setData("products", [...products, selectedProduct]);
        setProducts([...products, selectedProduct]);
    };

    const removeProduct = (index) => {
        setData(
            "products",
            products.filter((_, i) => i !== index)
        );
        setProducts(products.filter((_, i) => i !== index));
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setData("products", updatedProducts);
        setProducts(updatedProducts);
    };

    const calculateAmount = (price, discount, quantity) => {
        return (price * (1 - discount / 100) * quantity).toFixed(2);
    };

    const calculateTotal = () => {
        const untaxedAmount = products.reduce(
            (sum, product) =>
                sum +
                product.price * (1 - product.discount / 100) * product.quantity,
            0
        );

        const tax = (untaxedAmount * taxRate) / 100;
        const totalAmount = untaxedAmount + tax;

        return {
            untaxedAmount: untaxedAmount.toFixed(2),
            tax: tax.toFixed(2),
            totalAmount: totalAmount.toFixed(2),
        };
    };

    const totals = calculateTotal();

    const filteredProducts = productsData.filter(
        (product) =>
            product.name
                .toLowerCase()
                .includes(searchProductTerm.toLowerCase()) &&
            !products.some((p) => p.id === product.id) &&
            product.stock_quantity > 0
    );

    const filteredCustomers = customersData.filter((customer) =>
        `${customer.first_name} ${customer.last_name}`
            .toLowerCase()
            .includes(searchCustomerTerm.toLowerCase())
    );

    useEffect(() => {
        if (toCreate) {
            const today = new Date();
            const todayFormatted = today.toISOString().split("T")[0];

            const due = new Date(today);
            due.setDate(due.getDate() + 7);
            const dueFormatted = due.toISOString().split("T")[0];

            setData("invoice_date", todayFormatted);
            setData("due_date", dueFormatted);
        } else {
            const invoiceCustomer = customersData.find(
                (customer) => customer.id === invoice_data.customer_id
            );

            if (invoiceCustomer) {
                setSearchCustomerTerm(
                    `${invoiceCustomer.first_name} ${invoiceCustomer.last_name}`
                );
                setAddress(invoiceCustomer.address);
            }

            const matchingProducts = productsData
                .filter((product) =>
                    invoice_data.products.some(
                        (invoiceProduct) => invoiceProduct.id === product.id
                    )
                )
                .map((product) => {
                    const matchingInvoiceProduct = invoice_data.products.find(
                        (invoiceProduct) => invoiceProduct.id === product.id
                    );
                    return {
                        ...product,
                        init_quantity: matchingInvoiceProduct.quantity,
                        quantity: matchingInvoiceProduct.quantity,
                    };
                });

            setData("products", matchingProducts);
            setProducts(matchingProducts);
        }
    }, []);

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col bg-white p-6 shadow-lg m-4 w-full"
        >
            <FlashMessage />
            <div className="flex flex-row justify-between mb-6">
                {/* Customer Information */}
                <div>
                    <h2 className="font-bold text-lg mb-2">Customer</h2>
                    <input
                        type="text"
                        value={searchCustomerTerm}
                        onChange={(e) => {
                            setSearchCustomerTerm(e.target.value);
                            setOpenSearchCustomer(true);
                            setData("customer_id", null);
                            setAddress("");
                        }}
                        placeholder="Select a customer"
                        className="w-full border p-2 mb-4 max-w-96"
                    />
                    {openSearchCustomer &&
                        searchCustomerTerm &&
                        filteredCustomers.length > 0 && (
                            <ul className="absolute border rounded max-h-40 overflow-y-auto bg-white">
                                {filteredCustomers.map((customer, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setData("customer_id", customer.id);
                                            setOpenSearchCustomer(false);
                                            setSearchCustomerTerm(
                                                `${customer.first_name} ${customer.last_name}`
                                            );
                                            setAddress(customer.address);
                                        }}
                                    >
                                        {`${customer.first_name} ${customer.last_name}`}
                                    </li>
                                ))}
                            </ul>
                        )}

                    {openSearchCustomer &&
                        searchCustomerTerm &&
                        filteredCustomers.length === 0 && (
                            <p className="absolute rounded p-2 text-center max-h-40 bg-white">
                                No customers found.
                            </p>
                        )}
                    <input
                        type="text"
                        disabled
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border p-2 max-w-96"
                    />
                    {errors.customer_id && (
                        <>
                            <br />
                            <span className="text-sm text-red-600">
                                {errors.customer_id}
                            </span>
                        </>
                    )}
                </div>

                {/* Invoice and Payment Info */}
                <div className="max-w-40">
                    <label className="block font-bold mb-1">Invoice Date</label>
                    <input
                        type="date"
                        value={data.invoice_date}
                        onChange={(e) =>
                            setData("invoice_date", e.target.value)
                        }
                        className="w-full border p-2"
                    />
                    {errors.invoice_date && (
                        <span className="text-sm text-red-600">
                            {errors.invoice_date}
                        </span>
                    )}
                </div>

                <div className="max-w-40">
                    <label className="block font-bold mb-1">Due Date</label>
                    <input
                        type="date"
                        value={data.due_date}
                        onChange={(e) => setData("due_date", e.target.value)}
                        className="w-full border p-2"
                    />
                    {errors.due_date && (
                        <span className="text-sm text-red-600">
                            {errors.due_date}
                        </span>
                    )}
                </div>
                <div className="max-w-40">
                    <label className="block font-bold mb-1">
                        Payment Method
                    </label>
                    <select
                        value={data.payment_method}
                        onChange={(e) =>
                            setData("payment_method", e.target.value)
                        }
                        className="w-full border p-2 mb-2"
                    >
                        <option value="Credit Card">Credit Card</option>
                        <option value="Bank Transfer">Bank</option>
                        <option value="Cash">Cash</option>
                    </select>
                    {errors.payment_method && (
                        <span className="text-sm text-red-600">
                            {errors.payment_method}
                        </span>
                    )}
                    {!toCreate && (
                        <>
                            <label className="block font-bold mb-1">
                                Payment Status
                            </label>
                            <select
                                value={data.payment_status}
                                onChange={(e) =>
                                    setData("payment_status", e.target.value)
                                }
                                className="w-full border p-2"
                            >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            {errors.payment_status && (
                                <span className="text-sm text-red-600">
                                    {errors.payment_status}
                                </span>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Product Table */}
            <table className="w-full border mb-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-left">Product</th>
                        <th className="p-2 text-right">Price</th>
                        <th className="p-2 text-right">Discount %</th>
                        <th className="p-2 text-right">Quantity</th>
                        <th className="p-2 text-right">Amount</th>
                        <th className="p-2 text-right"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-2">
                                <input
                                    type="text"
                                    value={product.name}
                                    onChange={(e) =>
                                        handleProductChange(
                                            index,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border p-1"
                                    disabled
                                />
                            </td>
                            <td className="p-2 text-right">
                                <input
                                    type="number"
                                    value={product.price}
                                    onChange={(e) =>
                                        handleProductChange(
                                            index,
                                            "price",
                                            parseFloat(e.target.value)
                                        )
                                    }
                                    className="w-full border p-1 text-right"
                                    disabled
                                />
                            </td>
                            <td className="p-2 text-right">
                                <input
                                    type="number"
                                    value={product.discount}
                                    onChange={(e) =>
                                        handleProductChange(
                                            index,
                                            "discount",
                                            parseFloat(e.target.value)
                                        )
                                    }
                                    className="w-full border p-1 text-right"
                                    disabled
                                />
                            </td>
                            <td className="p-2 text-right">
                                <input
                                    type="number"
                                    min={1}
                                    max={
                                        product.stock_quantity +
                                        (product.init_quantity
                                            ? product.init_quantity
                                            : 0)
                                    }
                                    value={product.quantity}
                                    onChange={(e) =>
                                        handleProductChange(
                                            index,
                                            "quantity",
                                            parseFloat(e.target.value)
                                        )
                                    }
                                    className="w-full border p-1 text-right"
                                />
                            </td>
                            <td className="p-2 text-right">
                                {calculateAmount(
                                    product.price,
                                    product.discount,
                                    product.quantity
                                )}{" "}
                                DH
                            </td>
                            <td className="p-2 text-right">
                                <button
                                    onClick={() => removeProduct(index)}
                                    className="text-red-600 hover:text-red-800"
                                    aria-label="Remove product"
                                    type="button"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {errors.products && (
                <span className="text-sm text-red-600">{errors.products}</span>
            )}
            {/* Add Product Section */}
            <div className="mb-6">
                <label className="block font-bold mb-1">Add Product</label>
                <input
                    type="text"
                    value={searchProductTerm}
                    onChange={(e) => setSearchProductTerm(e.target.value)}
                    placeholder="Search for a product..."
                    className="w-full border p-2 mb-2"
                />

                {searchProductTerm && filteredProducts.length > 0 && (
                    <ul className="absolute border rounded max-h-40 overflow-y-auto bg-white">
                        {filteredProducts.map((product, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    addProduct(product);
                                    setSearchProductTerm("");
                                }}
                            >
                                {product.name}
                            </li>
                        ))}
                    </ul>
                )}

                {searchProductTerm && filteredProducts.length === 0 && (
                    <p className="text-gray-500">No products found.</p>
                )}
            </div>

            {/* Notes Section */}
            <textarea
                value={data.notes}
                onChange={(e) => setData("notes", e.target.value)}
                placeholder="Add Notes"
                className="w-full border p-2 mb-2"
            ></textarea>
            {errors.notes && (
                <span className="text-sm text-red-600">{errors.notes}</span>
            )}

            {/* Totals */}
            <div className="grid grid-cols-2 gap-6 mt-4">
                <div></div>
                <div>
                    <p className="flex justify-between">
                        <span>Untaxed Amount:</span>
                        <span>{totals.untaxedAmount} DH</span>
                    </p>
                    <p className="flex justify-between">
                        <span>TVA ({taxRate}%):</span>
                        <span>{totals.tax} DH</span>
                    </p>
                    <p className="flex justify-between font-bold">
                        <span>Total Amount:</span>
                        <span>{totals.totalAmount} DH</span>
                    </p>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6">
                <button
                    type="cancel"
                    className="px-4 py-2 bg-gray-300 rounded mr-3"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-[#2A2A2A] text-white rounded"
                >
                    {toCreate ? "Create" : "Save"}
                </button>
            </div>
        </form>
    );
};

export default InvoiceForm;
