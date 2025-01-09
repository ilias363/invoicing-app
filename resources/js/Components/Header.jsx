import React from "react";
import ProfileCard from "./ProfilCard";
import { usePage } from "@inertiajs/react";

function Header() {
    const { auth } = usePage().props;
    const logoSrc = "/logonobgwhite.png";

    return (
        <header className="bg-[#2A2A2A] sticky top-0 left-0 w-full z-50">
            <nav className="flex items-center justify-between px-6 py-2">
                {/* Logo */}
                <a href={`/${auth.user.role.name}/dashboard`} className="w-2/12">
                    <img src={logoSrc} alt="Logo" className="w-auto h-10" />
                </a>

                {/* Navigation Links */}
                <div className="flex justify-center w-auto">
                    <ul className="flex gap-10 text-lg font-semibold text-center">
                        <a
                            href={`/${auth.user.role.name}/dashboard`}
                            className="hover:text-[#ACACAC] text-white tracking-widest cursor-pointer"
                        >
                            Dashboard
                        </a>
                        <a
                            href={`/${auth.user.role.name}/invoices`}
                            className="hover:text-[#ACACAC] text-white tracking-widest cursor-pointer"
                        >
                            Invoices
                        </a>
                        {(auth.user.role.name === 'admin' || auth.user.role.name === 'salesman') && (
                            <a
                                href={`/${auth.user.role.name}/products`}
                                className="hover:text-[#ACACAC] text-white tracking-widest cursor-pointer"
                            >
                                Products
                            </a>
                        )}
                        <a
                            href={`/${auth.user.role.name}/customers`}
                            className="hover:text-[#ACACAC] text-white tracking-widest cursor-pointer"
                        >
                            Customers
                        </a>
                        {auth.user.role.name === 'admin' && (
                            <a
                                href={`/${auth.user.role.name}/users`}
                                className="hover:text-[#ACACAC] text-white tracking-widest cursor-pointer"
                            >
                                Users Management
                            </a>
                        )}
                    </ul>
                </div>

                {/* Login Card */}
                <div className="flex items-center">
                    <ProfileCard />
                </div>
            </nav>
        </header>
    );
}

export default Header;
