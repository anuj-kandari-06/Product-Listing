import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/my-orders", {
                    credentials: "include",
                }
                );
                const data = await response.json();
                if (response.status === 401) {
                    navigate("/login", {
                        state: { from: "/my-orders" },
                        replace: true,
                    });
                    return;
                }
                if (!response.ok) {
                    throw new Error(data.message || "Unable to fetch orders");
                }
                setOrders(data.orders || []);
            } catch (error) {
                console.error("Orders error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [navigate]);
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading your orders...
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-red-600">{error}</p>
                <Link to="/" className="text-purple-600">
                    Continue Shoping
                </Link>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">
                        My Orders
                    </h1>
                    <Link to="/" className="text-sm font-semibold text-purple-600 hover:text-purple-700">
                        Continue Shopping
                    </Link>
                </div>

                {orders.length === 0 ? (
                    <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                        <i className="fa-solid fa-box-open text-5xl text-gray-300"></i>
                        <h2 className="mt-5 text-xl font-semibold text-gray-800">
                            No Orders Yet
                        </h2>
                        <p className="mt-2 text-gray-500">
                            You haven't placed any orders yet.
                        </p>
                        <Link to="/" className="mt-6 inline-block rounded-md bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-gray-50 px-5 py-4">
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            ORDER ID
                                        </p>
                                        <p className="font-semibold text-gray-800">
                                            {order._id}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            ORDER DATE
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {new Date(order.createdAt).toLocaleDateString("en-IN")}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            ORDER STATUS
                                        </p>
                                        <p className="font-semibold text-green-600">
                                            {order.orderStatus}
                                        </p>
                                    </div>
                                </div>
                                <div className="divide-y">
                                    {order.items.map((item, index) => (
                                        <div key={`${order._id}-${index}`} className="flex items-center gap-4 px-5 py-4">
                                            <img src={item.thumbnail} alt={item.title} className="h-20 w-20 rounded-lg object-contain" />
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-gray-800">
                                                    {item.title}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Quantity :{item.quantity}
                                                </p>
                                                <p className="mt-1 font-medium text-gray-800">
                                                    ${Number(item.price).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Payment:{order.paymentMode.toUpperCase()}
                                        </p>
                                    </div>
                                    <div className="border-t px-5 py-4">
                                        <h3 className="font-semibold text-gray-800">
                                            Delivery Address
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-600">
                                            {order.shippingAddress.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {order.shippingAddress.mobile}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {order.shippingAddress.address},
                                            {" "}{order.shippingAddress.city},
                                            {" "}{order.shippingAddress.state}
                                            {" - "}{order.shippingAddress.pincode}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">
                                            Total Amount
                                        </p>
                                        <p className="text-xl font-bold text-purple-600">
                                            ${Number(order.totalAmount).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
export default MyOrders;