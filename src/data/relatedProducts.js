
const relatedCategories = {
    beauty: ["beauty", "skin-care"],
    "skin-care": ["skin-care", "beauty", "fragrances"],
    fragrances: ["fragrances", "beauty", "skin-care"],

    "mens-shoes": ["mens-shoes", "womens-shoes"],
    "womens-shoes": ["womens-shoes", "mens-shoes"],

    "mens-shirts": ["mens-shirts", "tops"],
    tops: ["tops", "mens-shirts", "womens-dresses"],
    "womens-dresses": ["womens-dresses", "tops"],

    "mens-watches": ["mens-watches", "womens-watches"],
    "womens-watches": ["womens-watches", "mens-watches"],

    smartphones: ["smartphones", "mobile-accessories"],
    "mobile-accessories": ["mobile-accessories", "smartphones", "tablets"],
    tablets: ["tablets", "smartphones", "mobile-accessories"],
    laptops: ["laptops"],

    furniture: ["furniture", "home-decoration"],
    "home-decoration": ["home-decoration", "furniture"],

    "womens-bags": ["womens-bags"],
    "womens-jewellery": ["womens-jewellery"],
    sunglasses: ["sunglasses"],

    "kitchen-accessories": ["kitchen-accessories"],
    groceries: ["groceries"],
    "sports-accessories": ["sports-accessories"],
    motorcycle: ["motorcycle"],
    vehicle: ["vehicle"],
};

export const getRelatedProducts = (currentProduct, allProducts) => {
    if (!currentProduct) return [];

    const categories = relatedCategories[currentProduct.category] || [
        currentProduct.category,
    ];

    const sameCategoryProducts = allProducts.filter(
        (item) =>
            item.id !== currentProduct.id &&
            categories.includes(item.category)
    );

    const otherProducts = allProducts.filter(
        (item) =>
            item.id !== currentProduct.id &&
            !categories.includes(item.category)
    );

    sameCategoryProducts.sort((a, b) => {
        const aBrand = a.brand === currentProduct.brand ? 1 : 0;
        const bBrand = b.brand === currentProduct.brand ? 1 : 0;
        return bBrand - aBrand;
    });
    return [...sameCategoryProducts, ...otherProducts].slice(0, 8);
};
