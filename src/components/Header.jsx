import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { cartItems, wishlistItems } = useCart();

    useEffect(() => {
        const handlePageShow = () => {
            window.dispatchEvent(new Event("wishlist-refresh"));
        };
        window.addEventListener("pageshow", handlePageShow);
        return () => {
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, []);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/me", {
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("User check failed:", error);
                setUser(null);
            }
        };
        checkUser();
        window.addEventListener("auth-change", checkUser);
        return () => {
            window.removeEventListener("auth-change", checkUser);
        };
    }, []);

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/logout", {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                setUser(null);
                setProfileOpen(false);
                setMenuOpen(false);
                window.dispatchEvent(new Event("auth-change"));
                navigate("/");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setProfileOpen(false);
    };

    return (
        <header className="relative z-40 border-b border-gray-200 bg-white shadow-sm">
            <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-5 sm:py-4">
                <Link to="/" onClick={closeMenu} className="shrink-0 text-xl font-bold text-blue-600 sm:text-2xl">
                    ShopMart
                </Link>

                <nav className={`${menuOpen ? "flex" : "hidden"} absolute left-0 top-full z-50 w-full flex-col gap-4 border-b border-gray-200 bg-white p-5 shadow-md md:static md:flex md:w-auto md:flex-1 md:flex-row md:items-center md:justify-center md:gap-5 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
                    <Link to="/" onClick={closeMenu} className="text-gray-700 hover:text-blue-600">Home</Link>
                    <Link to="/" onClick={closeMenu} className="text-gray-700 hover:text-blue-600">Products</Link>
                    <Link to="/" onClick={closeMenu} className="text-gray-700 hover:text-blue-600">About</Link>
                    <Link to="/" onClick={closeMenu} className="text-gray-700 hover:text-blue-600">Contact</Link>
                </nav>

                <div className="flex shrink-0 items-center gap-3 sm:gap-5">
                    <div className="relative">
                        <button type="button" onClick={() => setProfileOpen(!profileOpen)} className="flex flex-col items-center text-gray-700 hover:text-blue-600" aria-expanded={profileOpen} aria-label="Open profile menu">
                            <i className="fa-regular fa-user text-lg sm:text-xl"></i>
                            <span className="text-[10px] font-semibold sm:text-xs">Profile</span>
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 top-full z-[60] mt-3 w-[min(18rem,calc(100vw-1.5rem))] rounded-md border border-gray-200 bg-white p-4 shadow-lg sm:p-5">
                                <h3 className="break-words font-semibold text-gray-800">{user ? `Welcome, ${user.name}` : "Welcome"}</h3>
                                <p className="mt-1 text-sm text-gray-600">To access account and manage orders.</p>

                                {!user && (
                                    <div className="mt-4">
                                        <Link to="/login" onClick={closeMenu} className="inline-block border border-gray-200 px-4 py-3 text-sm font-semibold text-blue-600 hover:border-blue-500">
                                            LOGIN / SIGNUP
                                        </Link>
                                    </div>
                                )}

                                <hr className="my-4" />

                                <div className="flex flex-col gap-3 text-sm text-gray-700">
                                    {user && (
                                        <>
                                            <Link to="/orders" onClick={closeMenu} className="border-b border-gray-100 py-2 font-medium hover:text-blue-600">Orders</Link>
                                            <Link to="/wishlist" onClick={closeMenu} className="border-b border-gray-100 py-2 font-medium hover:text-blue-600">Wishlist</Link>
                                            <Link to="/cart" onClick={closeMenu} className="border-b border-gray-100 py-2 font-medium hover:text-blue-600">Cart</Link>
                                            <Link to="/profile" onClick={closeMenu} className="border-b border-gray-100 py-2 font-medium hover:text-blue-600">Edit Profile</Link>
                                            <button type="button" onClick={handleLogout} className="pt-3 text-left text-red-600 hover:text-red-700">Logout</button>
                                        </>
                                    )}

                                    {!user && (
                                        <>
                                            <Link to="/wishlist" onClick={closeMenu} className="py-2 hover:text-blue-600">Wishlist</Link>
                                            <Link to="/" onClick={closeMenu} className="py-2 hover:text-blue-600">Contact Us</Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link to="/wishlist" onClick={() => setMenuOpen(false)} aria-label={`Wishlist${wishlistItems.length > 0 ? `, ${wishlistItems.length} items` : ""}`} className="flex flex-col items-center text-gray-700 hover:text-blue-600">
                        <span className="relative">
                            <i className="fa-regular fa-heart text-lg sm:text-xl"></i>
                            {wishlistItems.length > 0 && (
                                <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </span>
                        <span className="text-[10px] font-semibold sm:text-xs">Wishlist</span>
                    </Link>

                    <Link to="/cart" onClick={() => setMenuOpen(false)} aria-label={`Cart, ${cartCount} items`} className="relative flex items-center justify-center rounded-lg bg-blue-600 p-2.5 text-white hover:bg-blue-700 sm:gap-2 sm:px-4 sm:py-2">
                        <i className="fa-solid fa-cart-shopping text-base"></i>
                        <span className="hidden sm:inline">Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white ring-2 ring-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="text-xl text-gray-700 hover:text-blue-600 md:hidden" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen}>
                        <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
                    </button>
                </div>
            </div>
        </header>
    );
}
export default Header;
