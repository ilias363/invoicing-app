import { usePage } from "@inertiajs/react";
import React, { useState } from "react";

const SubHeader = ({ title, placeholder, onSearchSubmit, search, createLink }) => {
    const [searchTerm, setSearchTerm] = useState(search);

    const { auth } = usePage().props;

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearchSubmit(searchTerm);
    };

    return (
        <div className="flex items-center justify-between bg-[#2A2A2A] text-white p-4 w-full border-t-[1px] border-[#ABA8A8]">
            <h1 className="text-3xl font-bold text-white">{title}s List</h1>
            <div className="flex items-center space-x-4">
                {/* Search Input */}
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className="min-w-96 pl-10 pr-4 py-2 bg-gray-100 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 absolute left-3 top-2.5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35M16.2 10.8a5.4 5.4 0 11-10.8 0 5.4 5.4 0 0110.8 0z"
                        />
                    </svg>
                </form>
                
                {/* Create Invoice Button */}
                {(auth.user.role.name === 'admin' || auth.user.role.name === 'salesman') && (
                <a
                    href={createLink}
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
                >
                    Create {title}
                </a>)}
            </div>
        </div>
    );
};

export default SubHeader;
