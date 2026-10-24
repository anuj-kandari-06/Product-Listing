import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

function ProductListing() {
    const [Products, setProducts] = useState([]);
    const [Search, setSearch] = useState("");
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [showAllBrands, setShowAllBrands] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [SearchParams, setSearchParams] = useSearchParams();
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(() => {
        const page = Number(SearchParams.get("page")) || 1;
        return Math.max(1, page);
    });
    const productsPerPage = 12;
    const [isFiltering, setIsFiltering] = useState(false);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=0")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.products);
                const prices = data.products.map((product) => product.price);
                const lowestPrice = Math.floor(Math.min(...prices));
                const highestPrice = Math.max(...prices);
                setMinPrice(lowestPrice);
                setMaxPrice(highestPrice);
                setPriceMin(lowestPrice);
                setPriceMax(highestPrice);
                const allCategories = [...new Set(data.products.map((product) => product.category))];
                const allBrands = [...new Set(data.products.map((product) => product.brand).filter(Boolean))];
                setCategories(allCategories);
                setBrands(allBrands);
            })
            .catch((error) => {
                console.error("Products fetch error:", error);
            });
    }, []);

    useEffect(() => {
        setIsFiltering(true);
        const timer = setTimeout(() => {
            setIsFiltering(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [selectedCategories, selectedBrands, priceMin, priceMax]);

    const filteredProducts = Products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(Search.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const matchesPrice = product.price >= priceMin && product.price <= priceMax;
        return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    const gotToPage = (page) => {
        const nextPage = Math.min(Math.max(1, page), Math.max(1, totalPages));
        if (nextPage === currentPage) return;
        setIsPageLoading(true);
        setCurrentPage(nextPage);
        const params = new URLSearchParams(SearchParams);
        if (nextPage === 1) {
            params.delete("page");
        } else {
            params.set("page", String(nextPage));
        }
        setSearchParams(params);
        setTimeout(() => {
            setIsPageLoading(false);
        }, 500);
    };

    useEffect(() => {
        const pageFromURL = Number(SearchParams.get("page")) || 1;
        const validPage = Math.min(Math.max(1, pageFromURL), Math.max(1, totalPages));
        setCurrentPage((previousPage) => previousPage === validPage ? previousPage : validPage);
    }, [SearchParams, totalPages]);

    return (
        <div className="mx-auto max-w-7xl min-w-0 px-3 py-6 sm:px-5 sm:py-10">
            <Helmet>
                <title>ShopMart | Online Product Store</title>
                <meta name="description" content="Explore products across different categories and brands at ShopMart. Search, filter and discover products easily." />
                <meta name="robots" content="index,follow" />
            </Helmet>
            <h1 className="mb-6 text-center text-2xl font-bold sm:mb-8 sm:text-3xl">
                Product Listing
            </h1>
            <div className="mb-5 flex justify-center sm:mb-6">
                <div className="relative w-full max-w-lg">
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                    <input
                        type="text"
                        placeholder="Search Product....."
                        value={Search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="mb-4 flex items-center justify-between md:hidden">
                <p className="text-sm text-gray-600">
                    {filteredProducts.length} products
                </p>
                <button
                    type="button"
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    aria-expanded={filtersOpen}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600"
                >
                    <i className={`fa-solid ${filtersOpen ? "fa-xmark" : "fa-sliders"}`}></i>
                    {filtersOpen ? "Hide Filters" : "Filters"}
                </button>
            </div>
            <div className="flex min-w-0 flex-col gap-5 md:flex-row md:gap-6">
                <aside className={`${filtersOpen ? "block" : "hidden"} w-full min-w-0 rounded-lg border border-gray-200 p-4 sm:p-5 md:block md:w-64 md:shrink-0`}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">Filters</h2>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCategories([]);
                                setSelectedBrands([]);
                                setPriceMin(minPrice);
                                setPriceMax(maxPrice);
                                setCurrentPage(1);
                            }}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                            Clear All
                        </button>
                    </div>
                    <div className="mt-6 border-t border-gray-200 pt-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-bold text-gray-800">Category</h3>
                            {showAllCategories && (
                                <button type="button" onClick={() => setShowAllCategories(false)} className="text-xl text-gray-500 hover:text-blue-500" aria-label="Collapse categories">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            )}
                        </div>
                        <div className={`space-y-3 ${showAllCategories ? "max-h-64 overflow-y-auto pr-2" : ""}`}>
                            {categories.slice(0, showAllCategories ? categories.length : 8).map((category) => (
                                <label key={category} className="flex items-start gap-3 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedCategories([...selectedCategories, category]);
                                            } else {
                                                setSelectedCategories(selectedCategories.filter((item) => item !== category));
                                            }
                                            setCurrentPage(1);
                                        }}
                                        className="mt-1 shrink-0 accent-blue-500"
                                    />
                                    <span className="capitalize break-words">{category.replace("-", " ")}</span>
                                </label>
                            ))}
                        </div>
                        {!showAllCategories && categories.length > 8 && (
                            <button type="button" onClick={() => setShowAllCategories(true)} className="mt-4 text-sm font-medium text-blue-500 hover:text-blue-700">
                                +{categories.length - 8} more
                            </button>
                        )}
                    </div>
                    <div className="mt-6 border-t border-gray-200 pt-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-bold text-gray-800">Brand</h3>
                            {showAllBrands && (
                                <button type="button" onClick={() => setShowAllBrands(false)} className="text-xl text-gray-500 hover:text-blue-500" aria-label="Collapse brands">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            )}
                        </div>
                        <div className={`space-y-3 ${showAllBrands ? "max-h-64 overflow-y-auto pr-2" : ""}`}>
                            {brands.slice(0, showAllBrands ? brands.length : 8).map((brand) => (
                                <label key={brand} className="flex items-start gap-3 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={selectedBrands.includes(brand)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedBrands([...selectedBrands, brand]);
                                            } else {
                                                setSelectedBrands(selectedBrands.filter((item) => item !== brand));
                                            }
                                            setCurrentPage(1);
                                        }}
                                        className="mt-1 shrink-0 accent-blue-500"
                                    />
                                    <span className="break-words">{brand}</span>
                                </label>
                            ))}
                        </div>
                        {!showAllBrands && brands.length > 8 && (
                            <button type="button" onClick={() => setShowAllBrands(true)} className="mt-4 text-sm font-medium text-blue-500 hover:text-blue-700">
                                +{brands.length - 8} more
                            </button>
                        )}
                    </div>
                    <div className="mt-6 border-t border-gray-200 pt-5">
                        <h3 className="mb-5 font-bold text-gray-800">PRICE</h3>
                        <div className="relative flex h-5 items-center">
                            <div className="absolute h-1 w-full rounded-full bg-gray-200"></div>
                            <div
                                className="absolute h-1 rounded-full bg-blue-500"
                                style={{
                                    left: `${((priceMin - minPrice) / (maxPrice - minPrice || 1)) * 100}%`,
                                    right: `${100 - ((priceMax - minPrice) / (maxPrice - minPrice || 1)) * 100}%`
                                }}
                            ></div>
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={priceMin}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (value <= priceMax) {
                                        setPriceMin(value);
                                        setCurrentPage(1);
                                    }
                                }}
                                className="price-slider"
                                aria-label="Minimum price"
                            />
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={priceMax}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (value >= priceMin) {
                                        setPriceMax(value);
                                        setCurrentPage(1);
                                    }
                                }}
                                className="price-slider"
                                aria-label="Maximum price"
                            />
                        </div>
                        <p className="mt-4 break-words text-sm font-semibold text-gray-800">
                            ${priceMin.toLocaleString("en-US")} - ${priceMax.toLocaleString("en-US")}
                        </p>
                    </div>
                </aside>
                <div className="min-w-0 flex-1">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
                        {isFiltering || isPageLoading ? (
                            <div className="col-span-full flex h-[400px] flex-col items-center justify-center">
                                <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600"></i>
                                <p className="mt-3 font-medium text-gray-600">Loading Products....</p>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <p className="col-span-full mt-8 text-center text-gray-500">No Products found.</p>
                        ) : (
                            currentProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                    </div>
                    {totalPages > 1 && (
                        <div className="mt-10 flex min-h-[40px] flex-wrap items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => gotToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
                            >
                                <i className="fa-solid fa-chevron-left sm:mr-2"></i>
                                <span className="hidden sm:inline">Previous</span>
                            </button>
                            {getPageNumbers().map((page, index) =>
                                page === "..." ? (
                                    <span key={`dots-${index}`} className="px-1 py-2 text-gray-500 sm:px-2">...</span>
                                ) : (
                                    <button
                                        type="button"
                                        key={page}
                                        onClick={() => gotToPage(page)}
                                        aria-current={currentPage === page ? "page" : undefined}
                                        className={`min-w-9 rounded-lg border px-2.5 py-2 text-sm font-semibold transition sm:min-w-10 sm:px-3 ${currentPage === page ? "border-blue-600 bg-blue-600 text-white shadow-sm" : "border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:bg-blue-50"}`}
                                    >
                                        {page}
                                    </button>
                                )
                            )}
                            <button
                                type="button"
                                onClick={() => gotToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
                            >
                                <span className="hidden sm:inline">Next</span>
                                <i className="fa-solid fa-chevron-right sm:ml-2"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default ProductListing;