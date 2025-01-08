import React from "react";
import { useForm, usePage } from "@inertiajs/react";

const Home = () => {
    const { auth } = usePage().props;
    const { post } = useForm();

    const handleLogout = () => {
        post("/logout");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-white shadow-lg rounded-lg p-12 max-w-lg w-full text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
                    Welcome to Home Accountant
                </h1>
                {auth?.user ? (
                    <>
                        <p className="text-lg text-gray-700 mb-4">
                            Hello, {auth.user.first_name + " " + auth.user.last_name}! You
                            are logged in.
                        </p>
                        <p className="text-lg text-gray-600 mb-4">
                            Email: {auth.user.email}
                        </p>
                    </>
                ) : (
                    <p className="text-lg text-gray-700 mb-4">
                        You are not logged in.
                    </p>
                )}
                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;
