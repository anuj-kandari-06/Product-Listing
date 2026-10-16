import { createContext, useContext, useState } from "react";
const CartContext = createContext();
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (product, quantity = 1) => {
        setCartItems((previousItems) => {
            const existingItem = previousItems.find(
                (item) => item.id === product.id
            );

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
    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}
export function useCart() {
    return useContext(CartContext);
}
