import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Toast from "./Toast";
import { useCart } from "../Context/CartContext";
import { getRelatedProducts } from "../data/relatedProducts";

function ProductDetails() {
    const { slug } = useParams();
    const [products, setProduct] = useState(null);
    const[relatedProducts, setRelatedProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [cartMessage, setCartMessage] = useState("");
    const { addToCart, wishlistItems, toggleWishlist } = useCart();
    const isWishlisted = products ? wishlistItems.some((item) => item.id === products.id) : false;

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=0")
            .then((response) => response.json())
            .then((data) => {
                const product = data.products.find((item) => {
                    const productSlug = item.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "");
                    return productSlug === slug;
                });
                if (product) {
                    setProduct(product);
                    setSelectedImage(product.images[0] || product.thumbnail);
                    const related = getRelatedProducts(product, data.products);
                    setRelatedProducts(related);
                } else {
                    setProduct(false);
                    setRelatedProducts([]);
                }
            })
            .catch((error) => {
                console.error("products fetch error:", error);
                setProduct(false);
            });
    }, [slug]);

    if (products === null) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-xl font-semibold text-gray-600">Loading....</p>
            </div>
        );
    }

    if (products === false) {
        return <div className="p-6 text-center">Product not found</div>;
    }

    return (
        <div className="mx-auto max-w-6xl min-w-0 px-3 py-5 sm:p-6">
            {cartMessage && (
                <Toast message={cartMessage} onClose={() => setCartMessage("")} />
            )}
            <Helmet>
                <title>{products.title} | ShopMart</title>
                <meta name="description" content={`${products.description} Buy ${products.title} at ShopMart.`} />
                <meta property="og:title" content={`${products.title} | ShopMart`} />
                <meta property="og:description" content={products.description} />
                <meta property="og:image" content={products.thumbnail} />
            </Helmet>
            <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
                <div className={`flex min-w-0 gap-2 sm:gap-3 ${products.images.length <= 1 ? "justify-center" : ""}`}>
                    {products.images.length > 1 && (
                        <div className="flex shrink-0 flex-col gap-2 sm:gap-3">
                            {products.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${products.title} ${index + 1}`}
                                    onClick={() => setSelectedImage(image)}
                                    className={`h-16 w-16 cursor-pointer rounded-md border object-contain sm:h-20 sm:w-20 ${selectedImage === image ? "border-blue-500" : "border-gray-300"}`}
                                />
                            ))}
                        </div>
                    )}
                    <div className={`flex min-w-0 w-full items-center justify-center rounded-lg border ${products.images.length <= 1 ? "h-64 max-w-lg sm:h-[450px]" : "h-72 max-w-md sm:h-96"}`}>
                        <img
                            src={selectedImage || products.thumbnail}
                            alt={products.title}
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>
                <div className="min-w-0">
                    <h1 className="break-words text-2xl font-bold text-gray-800 sm:text-3xl">
                        {products.title}
                    </h1>
                    <div className="mt-3 flex items-center gap-2">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-medium">{products.rating}</span>
                        <span>Rating</span>
                    </div>
                    <div className="mt-5">
                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <span className="text-3xl font-bold text-blue-600">
                                ${products.price}
                            </span>
                            <span className="rounded-md bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">
                                {products.discountPercentage}% OFF
                            </span>
                        </div>
                        <p className="mt-1 text-gray-400 line-through">
                            ${(products.price / (1 - products.discountPercentage / 100)).toFixed(2)}
                        </p>
                    </div>
                    <p className="mt-4 break-words text-gray-600">
                        <span className="font-semibold">Category:</span>{" "}
                        {products.category}
                    </p>
                    <p className="mt-2 break-words text-gray-600">
                        <span className="font-semibold">Brand:</span>{" "}
                        {products.brand}
                    </p>
                    <p className="mt-2 text-gray-600">
                        <span className="font-semibold">Stock:</span>{" "}
                        {products.stock}
                    </p>
                    <div className="mt-6">
                        <h2 className="text-lg font-bold">Description</h2>
                        <p className="mt-2 break-words leading-6 text-gray-600">
                            {products.description}
                        </p>
                    </div>
                    <div className="mt-6">
                        <p className="mb-2 font-semibold">Quantity</p>
                        <div className="flex w-fit items-center rounded-md border border-gray-300">
                            <button
                                type="button"
                                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                className="px-4 py-2 text-lg hover:bg-gray-100"
                                aria-label="Decrease quantity"
                            >
                                -
                            </button>
                            <span className="border-x border-gray-300 px-5 py-2">
                                {quantity}
                            </span>
                            <button
                                type="button"
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 py-2 text-lg hover:bg-gray-100"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col items-start gap-4">
                        <div className="flex w-full flex-wrap items-center gap-3 sm:gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    addToCart(products, quantity);
                                    setCartMessage("Added to Cart");
                                }}
                                className="w-full shrink-0 rounded-md bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 sm:w-40 sm:px-6"
                            >
                                ADD TO CART
                            </button>
                            <button
                                type="button"
                                onClick={() => toggleWishlist(products)}
                                className="w-full rounded-md border border-gray-300 px-5 py-3 hover:bg-gray-100 sm:w-auto sm:px-6"
                            >
                                <i className={isWishlisted ? "fa-solid fa-heart mr-2 text-pink-600" : "fa-regular fa-heart mr-2"}></i>
                                WISHLIST
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductDetails;