import { useForm } from "@inertiajs/react";

const Login = () => {
    const { data, setData, post, errors } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-center mb-6">
                        <img
                            src="logo_no_bg.png"
                            alt="Logo"
                            className="h-24 w-auto"
                        />
                </div>
                <div className="flex w-full h-0.5 bg-gray-600 mb-6"></div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Login
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <span className="text-sm text-red-600 mt-1">
                                {errors.email}
                            </span>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <span className="text-sm text-red-600 mt-1">
                                {errors.password}
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#2A2A2A] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
