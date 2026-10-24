import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
    const slug = product.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    return (
        <div className="group min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <Link to={`/products/${slug}`} className="block">
                <div className="relative flex items-center justify-center overflow-hidden p-3">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-32 w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:h-48"
                    />

                    <div className="absolute inset-0 hidden items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
                        <span className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900">
                            VIEW PRODUCT
                        </span>
                    </div>
                </div>

                <div className="p-3 sm:p-4">
                    <h2 className="line-clamp-2 break-words text-sm font-semibold text-gray-800 sm:text-base">
                        {product.title}
                    </h2>

                    <p className="mt-2 font-bold text-gray-900">
                        ${Number(product.price).toFixed(2)}
                    </p>

                    {product.rating != null && (
                        <p className="mt-1 text-sm text-gray-500">
                            <i className="fa-solid fa-star text-yellow-400"></i>{" "}
                            {product.rating}
                        </p>
                    )}
                </div>
            </Link>
        </div>
    );
}
export default ProductCard;