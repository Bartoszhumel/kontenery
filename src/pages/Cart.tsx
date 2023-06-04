import React, {useContext, useEffect, useState} from "react";
import {CartItem} from "../components/CartItem.tsx";
import {ShopContext} from "../context/shop-context.tsx";
import "../components/CartItem.css";
import {useNavigate} from "react-router-dom";
export const Cart = () => {
    const {cartItems} = useContext(ShopContext);

    const [pizzaList, setPizzaList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:4000/getPizzas',{
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setPizzaList(data);
                console.log(data);
                setLoading(false);
            });
    }, []);
    const nav = useNavigate();
    const getTotalCartAmount = () => {
        let total = 0;
        for (let i = 0; i < pizzaList.length; i++) {
            if(cartItems[pizzaList[i].id]>0)
            {
                total = total + cartItems[pizzaList[i].id]*pizzaList[i].smallPrice;
            }
        }
        return total;
    }
    const totalCartAmount = getTotalCartAmount()

    return (
        <div className="cart">
            <div>
                <h1>Koszyk</h1>
            </div>
            <div className="cartItems" hidden={loading}>
                {pizzaList.map((pizza) => {
                    if(cartItems[pizza.id]>0) {
                        return <CartItem product={pizza}/>
                    }
                }
                )}
            </div>
            {totalCartAmount > 0 ?(
            <div className="Checkout">
                <p>Suma: {totalCartAmount}zł</p>
                <button onClick={()=> nav("/menu")}>Kontynuj zakupy </button>
                <button>Do kasy</button>
            </div>
                ):(
                    <h1>Brak produktów w koszyku</h1>
                )}
        </div>
    );
}