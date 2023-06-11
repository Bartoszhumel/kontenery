import * as React from "react";

export const ShopContext = React.createContext(null);

const getCartItems = () => {
    let cart = {};
    for (let i = 1; i <= 4; i = i + 1) {
        cart[i] = 0;
    }
    return cart;
}

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = React.useState(getCartItems());

    const addToCart = (product_id) => {
        setCartItems((prev) => ({...prev, [product_id]: prev[product_id] + 1}));
    }

    const removeFromCart = (product_id) => {
        setCartItems((prev) => ({...prev, [product_id]: prev[product_id] - 1}));
    }
    const updateCartItemCount = (newAmount, product_id) => {
        setCartItems((prev) => ({...prev, [product_id]: newAmount}));
    }
    const contextValue = {cartItems, addToCart, removeFromCart, updateCartItemCount};
    console.log(cartItems);

    return (
        <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
    )
}