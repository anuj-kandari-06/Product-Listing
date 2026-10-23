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
                console.error("User check faild:", error);
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
                navigate("/");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    return (
        <header className="border-b border-gray-200 bg-white shadow-sm">
            <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
                <Link to="/" className="text-2xl font-bold text-blue-600">ShopMart</Link>
                <nav className={`${menuOpen ? "flex" : "hidden"} absolute left-0 top-full z-50 w-full flex-col gap-4 border-b bg-white p-5 md:static md:flex md:w-auto md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}>
                    <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600">Home</Link>
                    <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600">Products</Link>
                    <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600">About</Link>
                    <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600">Contact</Link>
                    {/* <Link to="/login" onClick={() => setMenuOpen(false)} className="font-medium text-gray-700 hover:text-blue-600">Login</Link>
                    <Link to="/register" onClick={() => setMenuOpen(false)} className="rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700">Register</Link> */}
                </nav>
                <div className="flex gap-5 items-center">
                    <div className="relative">
                        <button onClick={() => setProfileOpen(!profileOpen)} className="flex flex-col items-center text-gray-700 hover:text-blue-600" aria-expanded={profileOpen}>
                            <i className="fa-regular fa-user text-xl"></i>
                            <span className="text-xs font-semibold">Profile</span>
                        </button>
                        {profileOpen && (
                            <div className="absolute right-0 top-full z-50 mt-3 w-72 rounded-md border border-gray-200 bg-white p-5 shadow-lg">
                                <h3 className="font-semibold text-gray-800">{user ? `Welcome,${user.name}` : "Welcome"}</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    To access account and manage orders.
                                </p>
                                {!user && (
                                    <div className="mt-4">
                                        <Link to="/Login" onClick={() => setProfileOpen(false)} className="inline-block border border-gray-200 px-5 py-3 font-semibold text-blue-600 hover:border-blue-500">
                                            LOGIN / SIGNUP
                                        </Link>
                                    </div>
                                )}
                                <hr className="my-4" />
                                <div className="flex flex-col gap-3 text-sm text-gray-700">
                                    {user && (
                                        <>
                                            <Link to="/orders" onClick={() => setProfileOpen(false)} className="border-b border-gray-100 py-2 font-medium hover:text-blue-600">Orders</Link>
                                            <Link to="/wishlist" onClick={() => setProfileOpen(false)} className="border-b border-gray-100 py-2 font-medium hover:text-blue-600">Wishlist</Link>
                                            <Link to="/cart" onClick={() => setProfileOpen(false)} className="border-b border-gray-100 py-2 font-medium hover:text-blue-600">Cart</Link>
                                            <Link to="/profile" onClick={() => setProfileOpen(false)} className="border-b border-gray-100 py-2 font-medium hover:text-blue-600">Edit Profile</Link>

                                            <button type="button" onClick={handleLogout} className="pt-3 text-left text-red-600 hover:text-red-700">
                                                Logout
                                            </button>
                                        </>
                                    )}
                                    {!user && (
                                        <>
                                            <Link to="/wishlist" onClick={() => setProfileOpen(false)} className="py-2 hover:text-blue-600">
                                                Wishlist
                                            </Link>
                                            <Link to="/" onClick={() => setProfileOpen(false)} className="py-2 hover:text-blue-600">
                                                Contact Us
                                            </Link>
                                        </>
                                    )}
                                </div>

                            </div>

                        )}
                    </div>

                    <Link to="/wishlist" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
                        <span className="relative">
                            <i className="fa-regular fa-heart text-xl"></i>
                            {/* {wishlistItems.length > 0 && (
                                <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                                    {wishlistItems.length}
                                </span>
                            )} */}
                        </span>
                        <span className="text-xs font-semibold">Wishlist</span>
                    </Link>

                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-700 md:hidden" aria-label="Toggle navigation menu" aria-expanded={menuOpen}>
                        <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
                    </button>
                    <Link to="/cart" className="relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        <i className="fa-solid fa-cart-shopping"></i>
                        Cart
                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white ring-2 ring-white">{cartCount}</span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
export default Header;
