import React from "react";
import { useForm } from "@inertiajs/react";

const CustomerForm = ({ customer_data, toCreate }) => {
  const { data, setData, post, errors, processing } = useForm(customer_data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toCreate ? post("/admin/create-customer") : post(`/admin/customers/${customer_data.customer_id}/edit`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center mx-auto p-4 bg-white shadow-md space-x-16 mt-[10%]"
    >
      <div className="mb-4 space-y-4">
        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          value={data.first_name}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}

        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={data.last_name}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
      </div>
      
      <div className="mb-4 space-y-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={data.email}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={data.phone}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div className="mb-4 space-y-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          name="address"
          id="address"
          value={data.address}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          rows={3}
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div>

      <button
        type="submit"
        className="h-[50%] py-2 px-4 bg-[#2A2A2A] text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={processing}
      >
        {processing ? "Processing..." : toCreate ? "Create Customer" : "Update Customer"}
      </button>
    </form>
  );
};

export default CustomerForm;
