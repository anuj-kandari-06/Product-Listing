import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

function Wishlist() {
    const { wishlistItems, toggleWishlist, addToCart } = useCart();
    const navigate = useNavigate();
    const [removingId, setRemovingId] = useState(null);

    return (
        <div className="mx-auto max-w-7xl px-3 py-6 sm:px-5 sm:py-10">
            <h1 className="mb-6 text-xl sm:text-2xl font-bold">
                My Wishlist ({wishlistItems.length})
            </h1>

            {wishlistItems.length === 0 ? (
                <div className="rounded-lg border bg-white px-4 py-10 text-center">
                    <i className="fa-regular fa-heart mb-3 text-4xl text-gray-400"></i>
                    <p className="text-gray-500">
                        Your wishlist is empty.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                    {wishlistItems.map((product) => (
                        <div key={product.id} className="min-w-0 rounded-lg border bg-white p-3 sm:p-4">
                            <img src={product.thumbnail} alt={product.title} className="h-36 w-full object-contain sm:h-48" />

                            <h2 className="mt-3 break-words font-semibold text-sm sm:text-base">
                                {product.title}
                            </h2>

                            <p className="mt-2 font-bold text-base sm:text-lg">
                                ${product.price}
                            </p>

                            <button type="button" onClick={() => toggleWishlist(product)} className="mt-3 w-full rounded-lg border border-pink-500 px-3 py-2 text-sm sm:text-base text-pink-600 transition hover:bg-pink-50">
                                Remove from Wishlist
                            </button>

                            <button type="button" onClick={() => { addToCart(product); navigate("/cart"); }} className="mt-3 w-full rounded-lg bg-blue-600 px-3 py-2 text-sm sm:text-base text-white transition hover:bg-blue-700">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Wishlist;