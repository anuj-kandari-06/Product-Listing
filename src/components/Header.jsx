import { useState } from "react";
function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className=" bg-white border-b border-gray-200 shadow-sm">
            <div className=" relative max-w-7xl mx-auto px-5 py-4 flex  items-center justify-between">
                <a href="/" className="text-2xl font-bold text-blue-600">
                    ShopMart
                </a>
                <nav className={`${menuOpen ? "flex" : "hidden"} absolute left-0 top-full z-50 w-full flex-col gap-4 border-b bg-white p-5 md:static md:w-auto md:flex-row md:borde-0 md:bg-transparent md:p-0`}>
                    <a href="/" className="text-gray-700 hover:text-blue-600">
                        Home
                    </a>

                    <a href="/" className="text-gray-700 hover:text-blue-600">
                        Products
                    </a>

                    <a href="/" className="text-gray-700 hover:text-blue-600">
                        About
                    </a>

                    <a href="/" className="text-gray-700 hover:text-blue-600">
                        Contact
                    </a>
                </nav>

                <button onClick={() => setMenuOpen(!menuOpen)}
                    className="text-2xl text-gray-700 md:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}>
                    <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
                </button>


                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    <i className="fa-solid fa-cart-shopping"></i>
                    Cart
                </button>
            </div>
        </header>
    );
}
export default Header;