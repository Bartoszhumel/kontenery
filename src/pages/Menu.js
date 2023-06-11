import React, {useEffect, useState} from 'react'
import {Product} from "../components/Product.tsx";

export default function Menu() {
    const [pizzaList, setPizzaList] = useState([]);
    const [loading, setLoading] = useState(false);
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
    return (
        <div className="App">
            <h1>Menu</h1>
            <div className="pizza-list" hidden={loading}>
                {pizzaList.map((pizza) => {
                    return <Product product={pizza}/>
                })}
            </div>
        </div>
    );
}