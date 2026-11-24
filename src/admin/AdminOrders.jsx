function AdminOrders() {
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
                        <tr>
                            <td colSpan="5" className="p-6 text-center text-gray-500">No orders available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default AdminOrders;
