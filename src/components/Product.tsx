import * as React from "react";
// @ts-ignore
import {ShopContext} from "../context/shop-context.tsx";
import {useContext} from "react";
export const Product = (props) => {
    const{id, name, smallPrice,mediumPrice, description, image} = props.product;
    const {addToCart,cartItems} = useContext(ShopContext);
    const cartItemSmall = cartItems[id];
    const cartItemLarge = cartItems[id+0.5];
    return (
        <div className="pizza-item" key={id}>
            <h2>{name}</h2>
            <p>{description}</p>
            <img src={image} height={150} width={150} alt={name}></img>
            <p>Cena {smallPrice} zł</p>
            <button onClick={() => addToCart(id)}>
                Dodaj do koszyka{cartItemSmall>0 && <>({cartItemSmall})</>}
            </button>
            {/*<p>Duza {mediumPrice} zł</p>*/}
            {/*<button onClick={() => addToCart(id+0.5)}>*/}
            {/*    Dodaj do koszyka{cartItemLarge>0 && <>({cartItemLarge})</>}*/}
            {/*</button>*/}
        </div>
    );
};