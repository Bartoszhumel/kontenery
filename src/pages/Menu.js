import React, { useState, useEffect } from 'react'
export default function Menu() {
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
    return (
        <div className="App">
            <body >
            <h1>Menu</h1>
            <div className="pizza-list" hidden={loading}>
                {pizzaList.map((pizza) => (
                    <div className="pizza-item" key={pizza.id}>
                        <h2>{pizza.name}</h2>
                        <p>{pizza.description}</p>
                        <img src={pizza.image} height={150} width={150}></img>
                    </div>))}
                </div>

            </body>
        </div>
    );
}