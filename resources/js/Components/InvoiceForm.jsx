import React, { useState } from "react";

const InvoiceForm = () => {
  const [products, setProducts] = useState([
    { name: "Product 1", price: 65.0, discount: 12.0, quantity: 6 },
  ]);

  const [customer, setCustomer] = useState("John Doe");
  const [address, setAddress] = useState("Address address, address");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank");
  const [invoiceDate, setInvoiceDate] = useState("2025-01-05");
  const [dueDate, setDueDate] = useState("2025-01-12");

  const addProduct = () => {
    setProducts([
      ...products,
      { name: "New Product", price: 0, discount: 0, quantity: 1 },
    ]);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const calculateAmount = (price, discount, quantity) => {
    return ((price * (1 - discount / 100)) * quantity).toFixed(2);
  };

  const calculateTotal = () => {
    const untaxedAmount = products.reduce(
      (sum, product) =>
        sum + product.price * (1 - product.discount / 100) * product.quantity,
      0
    );

    const tax = untaxedAmount * 0.2;
    const totalAmount = untaxedAmount + tax;

    return {
      untaxedAmount: untaxedAmount.toFixed(2),
      tax: tax.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    };
  };

  const totals = calculateTotal();

  return (
    <div className="flex flex-col bg-white p-6 shadow-lg m-4 w-full">
      {/* Customer Information */}
      <div className="flex flex-row justify-between mb-6">
        <div>
          <h2 className="font-bold text-lg mb-2">Customer</h2>
          <input
            type="text"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="w-full border p-2 mb-4"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-2"
          />
        </div>

        {/* Invoice and Payment Info */}
        <div className="mb-4">
            <label className="block font-bold mb-1">Invoice Date</label>
            <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="w-full border p-2"
            />
        </div>
        <div className="mb-4">
            <label className="block font-bold mb-1">Due Date</label>
            <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border p-2"
            />
        </div>
        <div>
            <label className="block font-bold mb-1">Payment Method</label>
            <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border p-2"
            >
                <option value="Bank">Bank</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
            </select>
        </div>
        
      </div>

      {/* Product Table */}
      <table className="w-full border mb-6">
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
                    handleProductChange(index, "name", e.target.value)
                  }
                  className="w-full border p-1"
                />
              </td>
              <td className="p-2 text-right">
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    handleProductChange(index, "price", parseFloat(e.target.value))
                  }
                  className="w-full border p-1 text-right"
                />
              </td>
              <td className="p-2 text-right">
                <input
                  type="number"
                  value={product.discount}
                  onChange={(e) =>
                    handleProductChange(index, "discount", parseFloat(e.target.value))
                  }
                  className="w-full border p-1 text-right"
                />
              </td>
              <td className="p-2 text-right">
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    handleProductChange(index, "quantity", parseFloat(e.target.value))
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
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addProduct} className="text-[#2A2A2A] underline mb-6">
        Add product
      </button>

      {/* Notes Section */}
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add Notes"
        className="w-full border p-2 mb-6"
      ></textarea>

      {/* Totals */}
      <div className="grid grid-cols-2 gap-6">
        <div></div>
        <div>
          <p className="flex justify-between">
            <span>Untaxed Amount:</span>
            <span>{totals.untaxedAmount} DH</span>
          </p>
          <p className="flex justify-between">
            <span>TVA (20%):</span>
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
        <button className="px-4 py-2 bg-gray-300 rounded mr-3">Cancel</button>
        <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded">
          Create
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;
