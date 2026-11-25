import { useState, useEffect } from "react";

function AdminOrders() {
    const [ orders, setOrders ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/admin/orders", {
                    credentials: "include",
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Unable to fetch orders");
                }
                setOrders(Array.isArray(data.orders) ?  data.orders : []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Orders</h1>
            <p className="text-gray-500 mb-8">Manage customer orders</p>
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Payment</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="p-6 text-center text-gray-500">No orders available</td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="5" className="p-6 text-center text-red-500">{error}</td>
                            </tr>
                        ) :
                        !orders || orders.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-6 text-center text-gray-500">No Orders Available</td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="border-t">
                                    <td className="p-4">{order._id}</td>
                                    <td className="p-4">
                                        <div>{order.shippingAddress?.name || order.user?.name || "N/A"}</div>
                                        <div className="text-sm text-gray-500">{order.shippingAddress?.email || order.user?.email || ""}</div>
                                    </td>
                                    <td className="p-4">{Number(order.totalAmount).toFixed(2)}</td>
                                    <td className="p-4">{order.paymentMode?.toUpperCase()}</td>
                                    <td className="p-4">{order.orderStatus}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default AdminOrders;
