import "./ProductCard.css";

function ProductCard({ product }) {
    return (
        <div className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 p-2 text-center shadow-sm transition hover:shadow-lg sm:p-4 sm:hover:-translate-y-1">
            <div className="relative group/image">
                <img
                    src={product.thumbnail}
                    alt={`${product.title} - ${product.category} product image`}
                    title={product.title}
                    loading="lazy"
                    className="h-32 w-full object-contain sm:h-48"
                />
                <div className="pointer-events-none absolute inset-0 hidden items-center justify-center opacity-0 transition group-hover/image:opacity-100 sm:flex">
                    <span className="max-w-full break-words rounded-md bg-black/70 px-3 py-2 text-sm font-semibold text-white">
                        {product.title}
                    </span>
                </div>
            </div>
            <div className="mt-3 flex min-h-10 min-w-0 items-center justify-center sm:mt-4">
                <h3 className="line-clamp-2 break-words text-sm font-semibold text-gray-800 sm:text-lg">
                    {product.title}
                </h3>
                <a
                    href={`/products/${product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                    className="hidden min-h-10 w-full items-center justify-center rounded-md border border-gray-200 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 sm:group-hover:flex"
                >
                    VIEW PRODUCT
                </a>
            </div>
            <p className="mt-2 break-words text-sm sm:mt-3 sm:text-base">
                <span className="font-medium">Price:</span>{" "}
                <span className="font-bold text-blue-600">${product.price}</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1 text-sm sm:gap-2 sm:text-base">
                <span className="font-medium">Rating:</span>
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span>{product.rating}</span>
            </div>
            <p className="break-words text-xs text-gray-500 sm:text-sm">
                <span className="font-black">Category:</span>{" "}
                {product.category}
            </p>
        </div>
    );
}
export default ProductCard;