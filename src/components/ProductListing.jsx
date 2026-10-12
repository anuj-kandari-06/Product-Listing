import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";


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
    const[selectedCategories , setSelectedCategories] = useState([]);
    const[selectedBrands , setSelectedBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=0")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProducts(data.products);
                const prices = data.products.map((product) => product.price);
                const lowestPrice = Math.floor(Math.min(...prices));
                const highestPrice = Math.ceil(Math.max(...prices));

                setMinPrice(lowestPrice);
                setMaxPrice(highestPrice);

                setPriceMin(lowestPrice);
                setPriceMax(highestPrice);

                const allCategories = [
                    ...new Set(data.products.map((product) => product.category)
                    )
                ];
                const allBrands = [
                    ...new Set(data.products.map((product) => product.brand)
                        .filter(Boolean)
                    )
                ];
                setCategories(allCategories);
                setBrands(allBrands);

            });
    }, []);

    const filteredProducts = Products.filter((product) =>{const matchesSearch =  product.title.toLowerCase().includes(Search.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 ||
    selectedCategories.includes(product.category);
    const matchesBrand = selectedBrands.length === 0 ||
    selectedBrands.includes(product.brand);
    const matchesPrice = product.price >= priceMin && product.price <= priceMax;
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    console.log("Price range:", priceMin, priceMax);
console.log("Filtered products:", filteredProducts.length);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    return (
        <div className="max-w-7xl mx-auto px-5 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">
                Product Listing
            </h1>

            <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-lg">
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                    <input
                        type="text"
                        placeholder="Search Product....."
                        value={Search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>
                {/* <div className="my-6 flex flex-wrap items-center gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Minimum Price
                        </label>
                        <input type="number" value={priceMin} min={minPrice} max={priceMax} onChange={(e)=>setPriceMin(Number(e.target.value))}
                        className="w-32 border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Maximum Price
                        </label>
                        <input type="number" value={priceMax} min={priceMin} max={maxPrice} onChange={(e)=>setPriceMax(Number(e.target.value))}
                        className="w-32 border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div> */}
            </div>
            <div className="flex gap-6">
                <aside className="w-64 shrink-0 border border-gray-200 rounded-lg p-5">
                    <h2 className="text-lg font-bold">
                        Filters
                    </h2>
                    <div className="mt-6 border-t border-gray-200 pt-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-bold mb-4 text-gray-800">Category</h3>
                            {showAllCategories && (
                                <button onClick={() => setShowAllCategories(false)}
                                    className="text-xl text-gray-500 hover:text-blue-500"
                                    aria-label="Close all categories">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            )}
                        </div>
                        <div className={`space-y-3 ${showAllCategories ? "max-h-64 overflow-y-auto pr-2" : ""}`}>
                            {categories.slice(0, showAllCategories ? categories.length : 8)
                                .map((category) => (
                                    <label key={category} className="flex items-center gap-3 text-sm text-gray-700">
                                        <input type="checkbox" checked={selectedCategories.includes(category)} onChange={(e)=>{
                                            if(e.target.checked) {
                                                setSelectedCategories([...selectedCategories,category]);
                                        
                                            }else{
                                                setSelectedCategories(
                                                    selectedCategories.filter((item)=>item !== category)
                                                );
                                            }
                                            setCurrentPage(1);
                                        }} 
                                        className="accent-blue-500" />
                                        <span className="capitalize">
                                            {category.replace("-", " ")}
                                        </span>
                                    </label>
                                ))}
                        </div>
                        {!showAllCategories && categories.length > 8 && (
                            <button onClick={() => setShowAllCategories(true)}
                                className="mt-4 text-sm font-medium text-blue-500 hover:text-blue-700">
                                +{categories.length - 8} more
                            </button>
                        )}
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-bold mb-4 text-gray-800">Brand</h3>
                            {showAllBrands && (
                                <button onClick={() => setShowAllBrands(false)}
                                    className="text-xl text-gray-500 hover:text-blue-500"
                                    aria-label="Close all brands">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            )}
                        </div>
                        <div className={`space-y-3 ${showAllBrands ? "max-h-64 overflow-y-auto pr-2" : ""}`}>
                            {brands.slice(0, showAllBrands ? brands.length : 8)
                                .map((brand) => (
                                    <label key={brand} className="flex items-center gap-3 text-sm text-gray-700">
                                        <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={(e)=>{
                                            if(e.target.checked) {
                                                setSelectedBrands([...selectedBrands,brand]);
                                        
                                            }else{
                                                setSelectedBrands(
                                                    selectedBrands.filter((item)=>item !== brand)
                                                );
                                            }
                                            setCurrentPage(1);
                                        }} className="accent-blue-500" />
                                        <span>
                                            {brand}
                                        </span>
                                    </label>
                                ))}
                        </div>
                        {!showAllBrands && brands.length > 8 && (
                            <button onClick={() => setShowAllBrands(true)}
                                className="mt-4 text-sm font-medium text-blue-500 hover:text-blue-700">
                                +{brands.length - 8} more
                            </button>
                        )}
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-5">
                        <h3 className="font-bold text-gray-800 mb-5">PRICE</h3>

                        <div className="relative h-5 flex items-center">
                            <div className="absolute w-full h-1 rounded-full bg-gray-200" />

                            <div
                                className="absolute h-1 rounded-full bg-blue-500"
                                style={{
                                    left: `${((priceMin - minPrice) / (maxPrice - minPrice || 1)) * 100}%`,
                                    right: `${100 - ((priceMax - minPrice) / (maxPrice - minPrice || 1)) * 100}%`,
                                }}
                            />

                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={priceMin}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (value <= priceMax) { setPriceMin(value);
                                    setCurrentPage(1);
                                    }
                                }}
                                className="price-slider"
                            />

                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={priceMax}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (value >= priceMin) { setPriceMax(value);
                                    setCurrentPage(1);
                                    }
                                }}
                                className="price-slider"
                            />
                        </div>

                        <p className="mt-4 text-sm font-semibold text-gray-800">
                            ${priceMin.toLocaleString("en-US")} - ${priceMax.toLocaleString("en-US")}
                        </p>
                    </div>
                </aside>

                <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  items-start">
                        {filteredProducts.length === 0 && (
                            <p className="text-center text-gray-500 mt-8">
                                No Products found.
                            </p>
                        )}
                        {currentProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <button onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border rounded-lg disabled:opacity-40">
                            Previous
                        </button>
                        <span className="px-4 py-2">
                            Page{currentPage} of {totalPages}
                        </span>

                        <button onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border rounded-lg disabled:opacity-40">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductListing;