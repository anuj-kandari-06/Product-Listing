import "./ProductCard.css";

function ProductCard({ product }) {
    return (
        <div className="group h-full border border-gray-200 rounded-xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-lg transition text-center">
            <div className="relative group/image">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-contain"
                />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition">
                    <span className="bg-black/70 text-white px-4 py-2 rounded-md text-sm font-semibold">
                        {product.title}
                    </span>
                </div>
            </div>             

            <div className="relative h-10 mt-4">
                <h3 className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-800 group-hover:hidden">
                    {product.title}
                </h3>

                <a
                    href={`/products/${product.id}`}
                    className="absolute inset-0 flex items-center justify-center border border-gray-200 rounded-md text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition"
                >
                    VIEW PRODUCT
                </a>
            </div>
            
            <p className="mt-3">
                <span className="font-medium">Price:</span>{" "}
                <span className="font-bold text-blue-600">
                    ${product.price}
                </span>
            </p>

            <div className="flex items-center justify-center gap-2">
                <span className="font-medium">Rating:</span>
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span>{product.rating}</span>
            </div>

            <p className="text-sm text-gray-500">
                <span className="font-black">Category:</span>{" "}
                {product.category}
            </p>

        </div>
    );
}

export default ProductCard;