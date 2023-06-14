import React, {useContext, useEffect, useState} from "react";
import {CartItem} from "../components/CartItem.tsx";
import {ShopContext} from "../context/shop-context.tsx";
import "../components/CartItem.css";
import {useNavigate} from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51N9TnYGPv8HgnGdPJ64IrP39AuvdOFn0PZ8ias5mg9UpqfSZDIz1maVmpIMwkKeAheNJGL51vVWUFpq2xlYcjkBS00pTbpukIU')

export const Cart = () => {
    const {cartItems} = useContext(ShopContext);
    const [pizzaList, setPizzaList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleAddressChange = (e) => {
        setShippingAddress(e.target.value);
    };
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:4000/getPizzas', {
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
            if (cartItems[pizzaList[i].id] > 0) {
                total = total + cartItems[pizzaList[i].id] * pizzaList[i].smallPrice;
            }
        }
        return total;
    }
    const totalCartAmount = getTotalCartAmount()

    async function doPayment() {
        console.log(shippingAddress);
        if (shippingAddress.length > 1 && email.length > 1) {
            console.log("doPayment");
            const pizzas = [];
            for (let i = 0; i < pizzaList.length; i++) {
                if (cartItems[pizzaList[i].id] > 0) {
                    for (let j = 0; j < cartItems[pizzaList[i].id]; j++) {
                        pizzas.push(pizzaList[i].id);
                    }
                }
            }
            sessionStorage.setItem('pizzas',pizzas.toString());
            sessionStorage.setItem('email',email);
            sessionStorage.setItem('address',shippingAddress);
            sessionStorage.setItem('price',totalCartAmount.toString());
            const stripeResp = await fetch('http://localhost:4000/payment?price=' + totalCartAmount);
            const {id: sessionId} = await stripeResp.json();

            const stripe = await stripePromise;
            const {error} = await stripe.redirectToCheckout({
                sessionId,
            });
            console.log(error);
        }
    }

    return (
        <div className="cart">
            <div>
                <h1>Koszyk</h1>
            </div>
            <div className="cartItems" hidden={loading}>
                {pizzaList.map((pizza) => {
                        if (cartItems[pizza.id] > 0) {
                            return <CartItem product={pizza}/>
                        }
                    }
                )}
            </div>
            {totalCartAmount > 0 ? (
                <div className="Checkout">
                    <p>Suma: {totalCartAmount}zł</p>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id="email" value={email} onChange={handleEmailChange}/>
                    </div>
                    <div>
                        <label htmlFor="address">Adres dostawy:</label>
                        <input type="text" id="address" value={shippingAddress} onChange={handleAddressChange}/>
                    </div>
                    <button onClick={() => nav("/menu")}>Kontynuj zakupy</button>
                    <button onClick={doPayment}>Do kasy</button>
                </div>
            ) : (
                <h1>Brak produktów w koszyku</h1>
            )}
        </div>
    );
}