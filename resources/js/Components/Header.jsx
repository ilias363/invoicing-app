import ProfileCard from "./ProfilCard";

function Header({isAdmin,user}) {
    const logoSrc = "/logonobgwhite.png";

    return (
        <header className="bg-[#2A2A2A] sticky top-0 left-0 w-full z-50">
            <nav className="flex items-center justify-between px-6 py-2">
                {/* Logo */}
                <a href="/admin/dashboard" className="w-2/12">
                    <img src={logoSrc} alt="Logo" className="w-auto h-10" />
                </a>

                {/* Navigation Links */}
                <div className="flex justify-center w-auto">
                    <ul className="flex gap-10 text-lg font-semibold text-center">
                        <a
                            href="/admin/dashboard"
                            className="hover:text-[#ACACAC] text-white tracking-widest cursor-pointer"
                        >
                            Dashboard
                        </a>
                        <a
                            href="/admin/invoices"
                            className="hover:text-[#ACACAC] text-white tracking-widest cursor-pointer"
                        >
                            Invoices
                        </a>
                        <a
                            href="/admin/products"
                            className="hover:text-[#ACACAC] text-white tracking-widest cursor-pointer"
                        >
                            Products
                        </a>
                        <a
                            href="/admin/customers"
                            className="hover:text-[#ACACAC] text-white tracking-widest cursor-pointer"
                        >
                            Customers
                        </a>
                        {isAdmin && (
                            <a
                                href="/admin/users"
                                className="hover:text-[#ACACAC] text-white tracking-widest cursor-pointer"
                            >
                                Users Management
                            </a>
                        )}
                    </ul>
                </div>

                {/* Login Card */}
                <div className="flex justify-center">
                    <ProfileCard user={user} />
                </div>
            </nav>
        </header>
    );
}

export default Header;
