import { useEffect, useState } from "react";

function AdminDashboard() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/admin/dashboard",
                    {
                        credentials: "include",
                    }
                );
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Access denied");
                }
                setMessage(data.message);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);
    if (loading) {
        return <p>Loading dashboard...</p>;
    }
   
return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 mt-2">Welcome to your ShopMart Admin Panel</p>
            </div>
            <p className="text-sm text-gray-500">
                {message}
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm">Total Revenue</p>
                    <span className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                        <i className="fa-solid fa-indian-rupee-sign"></i>
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">—</h2>
                <p className="text-xs text-gray-400 mt-2">Total sales revenue</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <span className="bg-green-100 text-green-600 p-3 rounded-lg">
                        <i className="fa-solid fa-box-open"></i>
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">—</h2>
                <p className="text-xs text-gray-400 mt-2">All customer orders</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm">Total Products</p>
                    <span className="bg-purple-100 text-purple-600 p-3 rounded-lg">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">—</h2>
                <p className="text-xs text-gray-400 mt-2">Products in store</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm">Total Customers</p>
                    <span className="bg-orange-100 text-orange-600 p-3 rounded-lg">
                        <i className="fa-solid fa-user"></i>
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">—</h2>
                <p className="text-xs text-gray-400 mt-2">Registered customers</p>
            </div>
        </div>
    </div>
);

}
export default AdminDashboard;
