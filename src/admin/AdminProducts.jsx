import { useEffect, useState } from "react";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        brand: "",
        price: "",
        discountPercentage: "",
        category: "",
        stock: "",
        thumbnail: "",
        description: "",
    });

    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch("http://localhost:5000/api/admin/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to add product");
            }
            setProducts((prev) => [data.product, ...prev]);
            setIsModalOpen(false);

            setFormData({
                title: "",
                brand: "",
                price: "",
                discountPercentage: "",
                category: "",
                stock: "",
                thumbnail: "",
                description: "",
            });
        } catch (error) {
            setFormError(error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setFormError("");
        setFormData({
            title: "",
            brand: "",
            price: "",
            discountPercentage: "",
            category: "",
            stock: "",
            thumbnail: "",
            description: "",

        });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [dummyResponse, mongoResponse] = await Promise.all([
                    fetch("https://dummyjson.com/products?limit=0"),
                    fetch("http://localhost:5000/api/admin/products", {
                        credentials: "include",
                    })
                ]);

                const dummyData = await dummyResponse.json();
                const mongoData = await mongoResponse.json();

                if (!dummyResponse.ok) {
                    throw new Error("Unable to fetch DummyJSON products");
                }

                if (!mongoResponse.ok) {
                    throw new Error(mongoData.message || "Unable to fetch MongoDB products");
                }

                setProducts([
                    ...(mongoData.products || []),
                    ...(dummyData.products || [])
                ]);

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
                            <tr key={product._id || product.id} className="border-t">
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
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block mb-2 font-medium">Product Name</label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter product name" className="w-full border rounded-md p-3" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Brand</label>
                                <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Enter brand" className="w-full border rounded-md p-3" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Price</label>
                                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Enter price" className="w-full border rounded-md p-3" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Discount Percentage</label>
                                <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} placeholder="Enter discount" className="w-full border rounded-md p-3" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Category</label>
                                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Enter category" className="w-full border rounded-md p-3" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Stock</label>
                                <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Enter stock" className="w-full border rounded-md p-3" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-2 font-medium">Product Image URL</label>
                                <input type="url" name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="Enter image URL" className="w-full border rounded-md p-3" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-2 font-medium">Description</label>
                                <textarea rows="4" name="description" value={formData.description} onChange={handleChange} placeholder="Enter product description" className="w-full border rounded-md p-3 resize-none" />
                            </div>
                            <div className="md:col-span-2 flex justify-end gap-3">
                                <button type="button" onChange={handleCancel} className="px-5 py-3 border rounded-md">Cancel</button>
                                {formError && (
                                    <p className="md:col-span-2 text-red-500">{formError}</p>
                                )}
                                <button type="submit" disabled={saving} className="px-5 py-3 bg-purple-600 text-white rounded-md">
                                    {saving ? "Saving..." : "Save Product"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
export default AdminProducts;
