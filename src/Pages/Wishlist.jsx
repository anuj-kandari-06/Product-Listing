import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

function Wishlist() {
    const { wishlistItems, toggleWishlist,addToCart } = useCart();
    const navigate =useNavigate();
    return (
        <div className="mx-auto max-w-7xl px-5 py-10">
            <h1 className="mb-6 text-2xl font-bold">
                My Wishlist ({wishlistItems.length})
            </h1>
            {wishlistItems.length === 0 ? (
                <p className="text-gray-500">
                    Your wishlist is empty.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {wishlistItems.map((product) => (
                        <div key={product.id} className="rounded-lg border p-4">
                            <img src={product.thumbnail} alt={product.title} className="h-48 w-full object-contain" />
                            <h2 className="mt-3 font-semibold">
                                {product.title}
                            </h2>
                            <p className="mt-2 font-bold">
                                ${product.price}
                            </p>
                            <button onClick={() => toggleWishlist(product)}
                                className="mt-3 w-full rounded-lg border border-pink-500 px-4 py-2 text-pink-600 hover:bgpink-50">
                                Remove from Wishlist
                            </button>
                            <button onClick={()=> {addToCart(product);navigate("/cart");}} className="mt-3 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
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