import React from "react";

const SubHeader = () => {
    return (
        <div className="flex items-center justify-between bg-[#2A2A2A] text-white p-4 w-full border-t-[1px] border-[#ABA8A8]">
            <h1 className="text-3xl font-bold text-white">Invoices List</h1>
            <div className="flex items-center space-x-4">
                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-10 pr-4 py-2 bg-gray-100 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
                    <button
                        className="absolute right-3 top-[13px] text-gray-500 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Filter Button */}
                <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md flex items-center space-x-2 hover:bg-gray-400 focus:outline-none">
                    <span>Filter Invoices</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {/* Create Invoice Button */}
                <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">
                    Create Invoice
                </button>
            </div>
        </div>
    );
};

export default SubHeader;
