import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

function Cart() {
    const { cartItems, addToCart, removeFromCart, decreaseQuantity, deleteFromCart } = useCart();
    const navigate = useNavigate();

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const totalOriginalPrice = cartItems.reduce((total, item) => {
        const discount = item.discountPercentage || 0;
        const originalPrice = discount > 0 ? item.price / (1 - discount / 100) : item.price;
        return total + originalPrice * item.quantity;
    }, 0);

    const totalDiscount = totalOriginalPrice - totalPrice;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-3 py-5 sm:px-6 sm:py-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 sm:mb-8">
                    ShopMart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white border rounded-xl p-6 sm:p-10 text-center">
                        <div className="text-5xl mb-4">
                            <i className="fa-solid fa-bag-shopping"></i>
                        </div>
                        <h2 className="text-xl font-semibold">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Add your favorite products to your cart.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white rounded-xl p-3 sm:p-5 shadow-md">
                                <h2 className="font-semibold text-sm sm:text-base text-gray-800">
                                    SHOPPING BAG ({totalItems} ITEMS)
                                </h2>
                            </div>

                            <div className="bg-white rounded-xl p-3 sm:p-5 shadow-md">
                                {cartItems.map((product, index) => {
                                    const discount = product.discountPercentage || 0;
                                    const originalPrice = discount > 0
                                        ? product.price / (1 - discount / 100)
                                        : product.price;

                                    return (
                                        <div key={product.id}>
                                            {index > 0 && (
                                                <hr className="border-gray-200 my-5 sm:my-6" />
                                            )}

                                            <div className="flex gap-3 sm:gap-6 py-2">
                                                <img
                                                    src={product.thumbnail}
                                                    alt={product.title}
                                                    className="w-24 h-28 sm:w-28 sm:h-44 object-contain shrink-0"
                                                />

                                                <div className="flex-1 min-w-0">
                                                    <h2 className="font-semibold text-sm sm:text-base text-gray-800 break-words">
                                                        {product.title}
                                                    </h2>

                                                    <p className="text-xs sm:text-sm text-gray-500 mt-2 break-words">
                                                        {product.brand || product.category || "ShopMart"}
                                                    </p>

                                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-3">
                                                        <span className="font-bold text-sm sm:text-base text-gray-900">
                                                            ${product.price.toFixed(2)}
                                                        </span>

                                                        {discount > 0 && (
                                                            <>
                                                                <span className="text-xs sm:text-sm text-gray-400 line-through">
                                                                    ${originalPrice.toFixed(2)}
                                                                </span>

                                                                <span className="text-xs sm:text-sm text-orange-600 font-semibold">
                                                                    {discount.toFixed(0)}% OFF
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4">
                                                        <span className="text-sm text-gray-600">
                                                            Qty
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() => decreaseQuantity(product.id)}
                                                            className="w-8 h-8 shrink-0 border rounded-full hover:bg-gray-100"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            -
                                                        </button>

                                                        <span className="font-semibold min-w-4 text-center">
                                                            {product.quantity}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() => addToCart(product)}
                                                            className="w-8 h-8 shrink-0 border rounded-full hover:bg-gray-100"
                                                            aria-label="Increase quantity"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => deleteFromCart ? deleteFromCart(product.id) : removeFromCart(product.id)}
                                                        className="text-sm font-semibold text-red-600 hover:text-red-800 mt-4"
                                                    >
                                                        REMOVE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <aside className="h-fit bg-white shadow-md rounded-lg p-4 sm:p-5 lg:sticky lg:top-24">
                            <h2 className="font-bold text-gray-800 mb-5">
                                PRICE DETAILS
                            </h2>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between gap-3">
                                    <span className="text-gray-600">
                                        Total MRP
                                    </span>
                                    <span className="shrink-0">
                                        ${totalOriginalPrice.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-3">
                                    <span className="text-gray-600">
                                        Discount on MRP
                                    </span>
                                    <span className="text-green-600 shrink-0">
                                        -${totalDiscount.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-3">
                                    <span className="text-gray-600">
                                        Delivery Fee
                                    </span>
                                    <span className="text-green-600 shrink-0">
                                        FREE
                                    </span>
                                </div>
                            </div>

                            <div className="border-t mt-5 pt-5 flex justify-between gap-3 font-bold text-base">
                                <span>Total Amount</span>
                                <span className="shrink-0">
                                    ${totalPrice.toFixed(2)}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate("/shipping")}
                                className="w-full bg-purple-600 text-white font-semibold py-3 rounded-md mt-6 hover:bg-purple-700 transition"
                            >
                                PLACE ORDER
                            </button>

                            <p className="text-xs text-gray-500 mt-4 text-center">
                                Safe and secure shopping with ShopMart.
                            </p>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
