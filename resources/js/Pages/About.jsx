import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    About Us
                </h1>
                <p className="text-lg text-gray-700 text-center mb-4">
                    We are a company committed to delivering the best services for our customers. Our team of professionals works hard to ensure your satisfaction.
                </p>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800">Our Mission:</h2>
                    <p className="text-gray-600">
                        Our mission is to provide high-quality solutions that cater to the diverse needs of our clients, ensuring long-lasting partnerships.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
