import { useCart } from "../Context/CartContext";

function Cart() {
    const { cartItems, addToCart, removeFromCart } = useCart();
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                My Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
            </h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cartItems.map((product) => (
                        <div key={product.id} className="border rounded-xl p-5">
                            <img src={product.thumbnail} alt={product.title} className="w-full h-64 object-contain" />
                            <h2 className="font-semibold mt-4">
                                {product.title}
                            </h2>
                            <p className="font-bold mt-2">
                                ${product.price}
                            </p>
                            <p className="mt-2">
                                Quantity:{product.quantity}
                            </p>
                            <button onClick={() => addToCart(product)} className="w-full mt-4 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
                                Add One More
                            </button>
                            <button onClick={()=>removeFromCart(product.id)} className="w-full mt-2 border border-red-500 text-red-600 py-3 rounded-md hover:bg-red-50">
                                Remove From Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Cart;