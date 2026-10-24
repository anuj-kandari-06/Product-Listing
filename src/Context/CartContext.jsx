import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const saveCart = localStorage.getItem("shopmart-cart");
        return saveCart ? JSON.parse(saveCart) : [];
    });

    const [wishlistItems, setWishlistItems] = useState(() => {
        const saveWishlist = localStorage.getItem("shopmart-wishlist");
        return saveWishlist ? JSON.parse(saveWishlist) : [];
    });

    useEffect(() => {
        const refreshWishlist = () => {
            const savedWishlist = localStorage.getItem("shopmart-wishlist");
            setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
        };

        window.addEventListener("wishlist-refresh", refreshWishlist);

        return () => {
            window.removeEventListener("wishlist-refresh", refreshWishlist);
        };
    }, []);

    const toggleWishlist = (product) => {
        setWishlistItems((previousItems) => {
            const alreadyExists = previousItems.some((item) => item.id === product.id);

            if (alreadyExists) {
                return previousItems.filter((item) => item.id !== product.id);
            }

            return [...previousItems, product];
        });
    };

    const addToCart = (product, quantity = 1) => {
        setCartItems((previousItems) => {
            const existingItem = previousItems.find((item) => item.id === product.id);

            if (existingItem) {
                return previousItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...previousItems, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((previousItems) =>
            previousItems.filter((item) => item.id !== productId)
        );
    };

    const decreaseQuantity = (productId) => {
        setCartItems((previousItems) =>
            previousItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            )
        );
    };

    useEffect(() => {
        localStorage.setItem("shopmart-cart", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("shopmart-wishlist", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decreaseQuantity, wishlistItems, toggleWishlist }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}