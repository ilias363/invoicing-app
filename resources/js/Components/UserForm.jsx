import React from "react";
import { useForm } from "@inertiajs/react";

const UserForm = () => {
  const { data, setData, post, errors, processing } = useForm({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    account_status: "active",
    role_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/admin/create-user");
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
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
        </label>
        <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
            Confirm Password
        </label>
        <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            value={data.password_confirmation}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
        />
        {errors.confirm_password && (
            <p className="text-red-500 text-sm">{errors.confirm_password}</p>
        )}
      </div>

      <div className="mb-4 space-y-4">
        <label htmlFor="account_status" className="block text-sm font-medium text-gray-700">
          Account Status
        </label>
        <select
          name="account_status"
          id="account_status"
          value={data.account_status}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.account_status && (
          <p className="text-red-500 text-sm">{errors.account_status}</p>
        )}
        <label htmlFor="role_id" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          name="role_id"
          id="role_id"
          value={data.role_id}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Select Role</option>
          <option value="1">Admin</option>
          <option value="2">Accountant</option>
          <option value="3">Salesman</option>
        </select>
        {errors.role_id && <p className="text-red-500 text-sm">{errors.role_id}</p>}
      </div>
      <button
        type="submit"
        className="h-[50%] py-2 px-4 bg-[#2A2A2A] text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={processing}
      >
        {processing ? "Processing..." : "Create User"}
      </button>
    </form>
  );
};

export default UserForm;
