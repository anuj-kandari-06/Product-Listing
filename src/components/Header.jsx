import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="border-b border-gray-200 bg-white shadow-sm">
            <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
                <Link to="/" className="text-2xl font-bold text-blue-600">ShopMart</Link>
                <nav className={`${menuOpen ? "flex" : "hidden"} absolute left-0 top-full z-50 w-full flex-col gap-4 border-b bg-white p-5 md:static md:flex md:w-auto md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}>
                    <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600">Home</Link>
                    <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600">Products</Link>
                    <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600">About</Link>
                    <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600">Contact</Link>
                    <Link to="/login" onClick={() => setMenuOpen(false)} className="font-medium text-gray-700 hover:text-blue-600">Login</Link>
                    <Link to="/register" onClick={() => setMenuOpen(false)} className="rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700">Register</Link>
                </nav>
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-700 md:hidden" aria-label="Toggle navigation menu" aria-expanded={menuOpen}>
                    <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
                </button>
                <button className="relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    <i className="fa-solid fa-cart-shopping"></i>
                    Cart
                    {cartCount > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white ring-2 ring-white">{cartCount}</span>
                    )}
                </button>
            </div>
        </header>
    );
}
export default Header;
