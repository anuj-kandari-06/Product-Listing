import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

function Header() {
    const { cartItems, wishlistItems } = useCart();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        let active = true;

        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/me", {
                    credentials: "include",
                });

                if (!response.ok) {
                    if (active) setUser(null);
                    return;
                }

                const data = await response.json();

                if (active) {
                    setUser(data.user || data);
                }
            } catch (error) {
                console.error("User fetch error:", error);
                if (active) setUser(null);
            }
        };

        fetchUser();

        const handleAuthChange = () => fetchUser();
        window.addEventListener("auth-change", handleAuthChange);
        window.addEventListener("pageshow", handleAuthChange);

        return () => {
            active = false;
            window.removeEventListener("auth-change", handleAuthChange);
            window.removeEventListener("pageshow", handleAuthChange);
        };
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/logout", {
                method: "POST",
                credentials: "include",
            });

            if (!response.ok) {
                alert("Logout failed. Please try again.");
                return;
            }

            setUser(null);
            setProfileOpen(false);
            setMenuOpen(false);
            window.dispatchEvent(new Event("auth-change"));
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
            alert("Backend se connection nahi ho paa raha hai.");
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
            <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:px-5">
                <Link to="/" className="shrink-0 text-xl font-bold text-blue-600 sm:text-2xl">
                    ShopMart
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    <Link to="/" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                        Home
                    </Link>
                    <Link to="/wishlist" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                        Wishlist
                    </Link>
                </nav>

                <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                    <div className="relative">
                        {user ? (
                            <button
                                type="button"
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex w-10 flex-col items-center justify-center gap-1 text-gray-800 sm:w-12"
                                aria-label="Open profile menu"
                            >
                                <i className="fa-regular fa-user text-xl leading-none"></i>
                                <span className="max-w-12 truncate text-[10px] leading-tight">
                                    Profile
                                </span>
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="flex w-10 flex-col items-center justify-center gap-1 text-gray-800 sm:w-12"
                            >
                                <i className="fa-regular fa-user text-xl leading-none"></i>
                                <span className="text-[10px] leading-tight">Login</span>
                            </Link>
                        )}

                        {user && profileOpen && (
                            <div className="absolute right-0 top-full mt-3 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                                <Link
                                    to="/profile"
                                    onClick={() => setProfileOpen(false)}
                                    className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <i className="fa-regular fa-user mr-2"></i>
                                    My Profile
                                </Link>
                                <Link
                                    to="/wishlist"
                                    onClick={() => setProfileOpen(false)}
                                    className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <i className="fa-regular fa-heart mr-2"></i>
                                    My Wishlist
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                >
                                    <i className="fa-solid fa-right-from-bracket mr-2"></i>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    <Link
                        to="/wishlist"
                        className="flex w-10 flex-col items-center justify-center gap-1 text-gray-800 sm:w-12"
                    >
                        <span className="relative flex h-5 items-center justify-center">
                            <i className="fa-regular fa-heart text-xl leading-none"></i>
                            {wishlistItems.length > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-pink-600 px-1 text-[9px] text-white">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </span>
                        <span className="text-[10px] leading-tight">Wishlist</span>
                    </Link>

                    <Link
                        to="/cart"
                        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 sm:h-10 sm:w-10"
                        aria-label="Shopping cart"
                    >
                        <i className="fa-solid fa-cart-shopping text-lg"></i>
                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex h-9 w-7 shrink-0 items-center justify-center text-gray-800 md:hidden"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                    >
                        <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-xl`}></i>
                    </button>

                    <div className="hidden items-center gap-3 md:flex">
                        {user ? (
                            <>
                                <span className="max-w-32 truncate text-sm text-gray-700">
                                    {user.name || user.mobile || user.email}
                                </span>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline">
                                    Login
                                </Link>
                                <Link to="/signup" className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {menuOpen && (
                <nav className="border-t border-gray-200 bg-white px-4 py-3 md:hidden">
                    <div className="flex flex-col gap-1">
                        <Link to="/" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100">
                            <i className="fa-solid fa-house mr-3 w-5"></i>
                            Home
                        </Link>
                        <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100">
                            <i className="fa-regular fa-heart mr-3 w-5"></i>
                            Wishlist
                        </Link>
                        <Link to="/cart" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100">
                            <i className="fa-solid fa-cart-shopping mr-3 w-5"></i>
                            Cart
                        </Link>
                        {user ? (
                            <>
                                <Link to="/profile" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100">
                                    <i className="fa-regular fa-user mr-3 w-5"></i>
                                    My Profile
                                </Link>
                                <button type="button" onClick={handleLogout} className="rounded-lg px-3 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50">
                                    <i className="fa-solid fa-right-from-bracket mr-3 w-5"></i>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-blue-600 hover:bg-gray-100">
                                    Login
                                </Link>
                                <Link to="/signup" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-blue-600 hover:bg-gray-100">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
}
export default Header;