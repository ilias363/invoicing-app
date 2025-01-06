import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

const ListUsers = ({ users, pages, searchTerm }) => {
    const [openUserId, setOpenUserId] = useState(null);

    const toggleActionsMenu = (userId) => {
        setOpenUserId(openUserId === userId ? null : userId);
    };

    return (
        <div className="bg-white shadow-lg rounded-xl py-6 px-10 mb-8">
            <table className="w-full text-center border-collapse border-2 border-gray-200">
                <thead className="bg-gray-300">
                    <tr className="text-lg font-semibold text-gray-600">
                        <th className="border px-6 py-3">User ID</th>
                        <th className="border px-6 py-3">Name</th>
                        <th className="border px-6 py-3">E-mail</th>
                        <th className="border px-6 py-3">Phone Number</th>
                        <th className="border px-6 py-3">Role</th>
                        <th className="border px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="hover:bg-gray-50 transition duration-200"
                        >
                            <td className="border px-6 py-4 text-gray-800">
                                {user.id}
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                {user.first_name} {user.last_name}
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                {user.email}
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                {user.phone}
                            </td>
                            <td className="border px-6 py-4 text-gray-800">
                                {user.role.name}
                            </td>
                            <td className="border px-6 py-4 text-center">
                                <button
                                    onClick={() =>
                                        toggleActionsMenu(user.id)
                                    }
                                    className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                >
                                    <FaEllipsisH size={25} />
                                </button>

                                {openUserId === user.id && (
                                    <div
                                        className="absolute w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        <div className="py-1">
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
                                : searchTerm
                                ? link.url + "&search=" + searchTerm
                                : link.url
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

export default ListUsers;
