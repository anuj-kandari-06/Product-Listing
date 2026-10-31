
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

    return allProducts
        .filter(
            (item) =>
                item.id !== currentProduct.id &&
                categories.includes(item.category)
        )
        .slice(0, 8);
};
