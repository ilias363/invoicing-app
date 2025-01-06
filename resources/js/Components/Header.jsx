import ProfileCard from "./ProfilCard";

function Header() {

    const logoSrc = "/logonobgwhite.png";

    return (
        <header className="bg-[#2A2A2A] sticky top-0 left-0 w-full z-50">
            <nav className="flex items-center justify-between px-6 py-2">
                {/* Logo */}
                <div className="w-2/12">
                    <img src={logoSrc} alt="Logo" className="w-auto h-10" />
                </div>

                {/* Navigation Links */}
                <div className="flex justify-center w-auto">
                    <ul
                        className="flex gap-10 text-lg font-semibold text-center"
                    >
                        {["Dashboard", "Invoices", "Products", "Customers", "Users Managment"].map((item, idx) => (
                            <a key={idx} className="hover:text-[#ACACAC] text-white tracking-widest cursor-pointer">
                                {item}
                            </a>
                        ))}
                    </ul>
                </div>

                {/* Login Card */}
                <div className="flex justify-center">
                    <ProfileCard />
                </div>
            </nav>
        </header>
    );
}

export default Header;
