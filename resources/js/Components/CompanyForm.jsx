import React from "react";
import { useForm } from "@inertiajs/react";
import FlashMessage from "./FlashMessage";

const CompanyForm = ({ company }) => {
    const { data, setData, post, errors, processing } = useForm({
        name: company.name || "",
        address: company.address || "",
        email: company.email || "",
        phone: company.phone || "",
        tax_id: company.tax_id || "",
        tax_rate: company.tax_rate || "",
        logo: "data:image/png;base64," + company.logo || "",
    });
    console.log(data.logo);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setData(name, reader.result);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/company/edit");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="min-w-full mx-auto my-5 p-8 bg-white shadow-lg rounded-lg space-y-6"
        >
            <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                    Edit Company Details
                </h2>
                <FlashMessage />
            </div>
            <div className="grid grid-cols-2 w-full gap-x-10 gap-y-4">
                {/* Company Name */}
                <div className="space-y-2">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Company Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={data.address}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                    {errors.address && (
                        <p className="text-red-500 text-sm">{errors.address}</p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Phone
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={data.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                </div>

                {/* Tax ID */}
                <div className="space-y-2">
                    <label
                        htmlFor="tax_id"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Tax ID
                    </label>
                    <input
                        type="text"
                        name="tax_id"
                        id="tax_id"
                        value={data.tax_id}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                    {errors.tax_id && (
                        <p className="text-red-500 text-sm">{errors.tax_id}</p>
                    )}
                </div>

                {/* Tax Rate */}
                <div className="space-y-2">
                    <label
                        htmlFor="tax_rate"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Tax Rate (%)
                    </label>
                    <input
                        type="number"
                        name="tax_rate"
                        id="tax_rate"
                        value={data.tax_rate}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        min="0"
                        max="100"
                        required
                    />
                    {errors.tax_rate && (
                        <p className="text-red-500 text-sm">
                            {errors.tax_rate}
                        </p>
                    )}
                </div>
            </div>

            {/* Logo */}
            <div className="space-y-4">
                <label
                    htmlFor="logo"
                    className="block text-sm font-medium text-gray-700"
                >
                    Logo
                </label>
                <input
                    type="file"
                    name="logo"
                    id="logo"
                    accept="image/*"
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                {data.logo && (
                    <img
                        src={data.logo}
                        alt="Company Logo"
                        className="mt-4 w-24 h-24 object-cover"
                    />
                )}
                {errors.logo && (
                    <p className="text-red-500 text-sm">{errors.logo}</p>
                )}
            </div>

            <button
                type="submit"
                className="h-[50%] py-3 px-5 self-center bg-[#2A2A2A] text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={processing}
            >
                {processing ? "Processing..." : "Update Company"}
            </button>
        </form>
    );
};

export default CompanyForm;
