function AdminCustomers() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Customers</h1>
            <p className="text-gray-500 mb-8">Manage registered customers</p>
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Customer Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Mobile</th>
                            <th className="p-4">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="4" className="p-6 text-center text-gray-500">No customers available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default AdminCustomers;
