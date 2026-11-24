import { useEffect, useState } from "react";

function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products/categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return <p>Loading categories...</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Categories</h1>
            <p className="text-gray-500 mb-8">Manage product categories</p>
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">S.No.</th>
                            <th className="p-4">Category Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.slug || index} className="border-t">
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4 capitalize">{category.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default AdminCategories;
