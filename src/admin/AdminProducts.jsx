import { useEffect, useState } from "react";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products?limit=0");
                const data = await response.json();
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                    <p className="text-gray-500 mt-1">Manage your products</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-purple-600 text-white px-5 py-3 rounded-md">Add product</button>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Product</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-t">
                                <td className="p-4">
                                    <div className="flex items-center gap-3 min-w-53">
                                        <img
                                            src={product.images?.[0] || product.thumbnail}
                                            alt={product.title}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = "https://placehold.co/100x100?text=No+Image";
                                            }}
                                            className="w-12 h-12 object-contain"
                                        />
                                        <span className="font-medium">{product.title}</span>
                                    </div>
                                </td>
                                <td className="p-4 capitalize">{product.category}</td>
                                <td className="p-4">${product.price}</td>
                                <td className="p-4">{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
                            <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-500 text-2xl">&times;</button>
                        </div>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block mb-2 font-medium">Product Name</label>
                                <input type="text" placeholder="Enter product name" className="w-full border rounded-md p-3" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Brand</label>
                                <input type="text" placeholder="Enter brand" className="w-full border rounded-md p-3" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Price</label>
                                <input type="number" placeholder="Enter price" className="w-full border rounded-md p-3" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Discount Percentage</label>
                                <input type="number" placeholder="Enter discount" className="w-full border rounded-md p-3" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Category</label>
                                <input type="text" placeholder="Enter category" className="w-full border rounded-md p-3" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Stock</label>
                                <input type="number" placeholder="Enter stock" className="w-full border rounded-md p-3" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-2 font-medium">Product Image URL</label>
                                <input type="url" placeholder="Enter image URL" className="w-full border rounded-md p-3" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-2 font-medium">Description</label>
                                <textarea rows="4" placeholder="Enter product description" className="w-full border rounded-md p-3 resize-none" />
                            </div>
                            <div className="md:col-span-2 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-3 border rounded-md">Cancel</button>
                                <button type="button" className="px-5 py-3 bg-purple-600 text-white rounded-md">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
export default AdminProducts;
