import React from 'react';

const Contact = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Contact Us
                </h1>
                <p className="text-lg text-gray-700 text-center mb-4">
                    We would love to hear from you! Please get in touch with any questions.
                </p>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800">Our Contact Information:</h2>
                    <p className="text-gray-600">Email: support@example.com</p>
                    <p className="text-gray-600">Phone: +123 456 7890</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
