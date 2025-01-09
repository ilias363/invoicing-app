import React from "react";
import { useForm } from "@inertiajs/react";
import FlashMessage from "./FlashMessage";

const ProductForm = ({ product_data, toCreate }) => {
  const { data, setData, post, errors, processing } = useForm(product_data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toCreate
      ? post("/admin/create-product")
      : post(`/admin/products/${product_data.id}/edit`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center mx-auto p-4 bg-white shadow-md space-x-16 mt-[10%]"
    >
    <FlashMessage />
      <div className="mb-4 space-y-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={data.name}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={data.description}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          rows={3}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      <div className="mb-4 space-y-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={data.price}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

        <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700">
          Stock Quantity
        </label>
        <input
          type="number"
          name="stock_quantity"
          id="stock_quantity"
          value={data.stock_quantity}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {errors.stock_quantity && <p className="text-red-500 text-sm">{errors.stock_quantity}</p>}
      </div>

      <div className="mb-4 space-y-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
        </label>
        <select
            name="category"
            id="category"
            value={data.category}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
            <option value="" disabled>
            Select a category
            </option>
            <option value="Categorie 1">Categorie 1</option>
            <option value="Categorie 2">Categorie 2</option>
            <option value="Categorie 3">Categorie 3</option>
            <option value="Categorie 4">Categorie 4</option>
            <option value="Categorie 5">Categorie 5</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
          Discount
        </label>
        <input
          type="number"
          name="discount"
          id="discount"
          value={data.discount}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {errors.discount && <p className="text-red-500 text-sm">{errors.discount}</p>}
      </div>


      <button
        type="submit"
        className="h-[50%] py-2 px-4 bg-[#2A2A2A] text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={processing}
      >
        {processing ? "Processing..." : toCreate ? "Create Product" : "Update Product"}
      </button>
    </form>
  );
};

export default ProductForm;
