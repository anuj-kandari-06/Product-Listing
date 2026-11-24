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
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Dashboard
            </h1>
            <p className="text-gray-500 mb-8">{message}</p>
        </div>
    );
}
export default AdminDashboard;
