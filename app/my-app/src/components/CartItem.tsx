import * as React from "react";
import {useContext} from "react";
// @ts-ignore
import {ShopContext} from "../context/shop-context.tsx";
import "./CartItem.css";

export const CartItem = (props) => {
    const {id, name, smallPrice, mediumPrice, description, image} = props.product;
    const {addToCart, cartItems, removeFromCart, updateCartItemCount} = useContext(ShopContext);
    const cartItemSmall = cartItems[id];
    // const cartItemLarge = cartItems[id+0.5];
    return (
        <div className="cartItem" key={id}>
            <div className="description">
                <p>{" "}</p>
                <b> {name}</b>
            </div>
            <img src={image} height={150} width={150} alt={name}></img>
            <p>Cena {smallPrice} zł</p>
            <div className="countHandler">
                <button onClick={() => removeFromCart(id)}>-</button>
                <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)}/>
                <button onClick={() => addToCart(id)}>+</button>
            </div>
        </div>
    );
};