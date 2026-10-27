
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
} from "react";

const CartContext = createContext();

const API_URL = "http://localhost:5000";

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [userId, setUserId] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    const loadRequestId = useRef(0);

    // Step 1: Login user ka cart aur wishlist MongoDB se load karo
    useEffect(() => {
        let active = true;

        const loadUserData = async () => {
            const requestId = ++loadRequestId.current;

            setDataLoaded(false);

            try {
                const meResponse = await fetch(
                    `${API_URL}/api/me`,
                    {
                        credentials: "include",
                    }
                );

                if (!meResponse.ok) {
                    if (
                        active &&
                        requestId === loadRequestId.current
                    ) {
                        setUserId(null);
                        setCartItems([]);
                        setWishlistItems([]);
                        setDataLoaded(true);
                    }

                    return;
                }

                const meData = await meResponse.json();
                const loggedInUserId = meData.user?.id;

                if (!loggedInUserId) {
                    throw new Error("User ID not found");
                }

                const response = await fetch(
                    `${API_URL}/api/cart-wishlist`,
                    {
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to load cart");
                }

                const data = await response.json();

                if (
                    active &&
                    requestId === loadRequestId.current
                ) {
                    setCartItems(
                        Array.isArray(data.cartItems)
                            ? data.cartItems
                            : []
                    );

                    setWishlistItems(
                        Array.isArray(data.wishlistItems)
                            ? data.wishlistItems
                            : []
                    );

                    setUserId(loggedInUserId);
                    setDataLoaded(true);
                }
            } catch (error) {
                console.error("Cart loading error:", error);

                if (
                    active &&
                    requestId === loadRequestId.current
                ) {
                    setUserId(null);
                    setCartItems([]);
                    setWishlistItems([]);
                    setDataLoaded(true);
                }
            }
        };

        loadUserData();

        // Login, logout ya refresh par user ka data dobara load karo
        window.addEventListener("auth-change", loadUserData);
        window.addEventListener("wishlist-refresh", loadUserData);

        return () => {
            active = false;

            window.removeEventListener(
                "auth-change",
                loadUserData
            );

            window.removeEventListener(
                "wishlist-refresh",
                loadUserData
            );
        };
    }, []);

    // Step 2: Cart aur wishlist ko MongoDB mein save karo
    useEffect(() => {
        if (!dataLoaded || !userId) {
            return;
        }

        const controller = new AbortController();

        const timeoutId = setTimeout(async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/cart-wishlist`,
                    {
                        method: "PUT",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            cartItems,
                            wishlistItems,
                        }),
                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    console.error(
                        "Cart save failed:",
                        response.status
                    );
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error(
                        "Cart save error:",
                        error
                    );
                }
            }
        }, 300);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [cartItems, wishlistItems, userId, dataLoaded]);

    // Step 3: Wishlist mein product add/remove karo
    const toggleWishlist = (product) => {
        setWishlistItems((previousItems) => {
            const alreadyExists = previousItems.some(
                (item) => item.id === product.id
            );

            if (alreadyExists) {
                return previousItems.filter(
                    (item) => item.id !== product.id
                );
            }

            return [...previousItems, product];
        });
    };

    // Step 4: Cart mein product add karo
    const addToCart = (product, quantity = 1) => {
        setCartItems((previousItems) => {
            const existingItem = previousItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return previousItems.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              quantity:
                                  (item.quantity || 1) + quantity,
                          }
                        : item
                );
            }

            return [
                ...previousItems,
                { ...product, quantity },
            ];
        });
    };

    // Step 5: Cart se product remove karo
    const removeFromCart = (productId) => {
        setCartItems((previousItems) =>
            previousItems.filter(
                (item) => item.id !== productId
            )
        );
    };

    // Step 6: Quantity kam karo, minimum 1 rahegi
    const decreaseQuantity = (productId) => {
        setCartItems((previousItems) =>
            previousItems.map((item) =>
                item.id === productId
                    ? {
                          ...item,
                          quantity: Math.max(
                              1,
                              (item.quantity || 1) - 1
                          ),
                      }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                decreaseQuantity,
                wishlistItems,
                toggleWishlist,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
