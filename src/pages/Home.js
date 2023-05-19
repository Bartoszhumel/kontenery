import React, { useState, useEffect } from 'react'
export default function Home() {
    const [pizzaList, setPizzaList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:4000/getPizzas')
            .then(response => response.json())
            .then(data => {
                setPizzaList(data);
                console.log(data);
                setLoading(false);
            });
    }, []);
    return (
        <body>
        <div className="App">
            <h1>Menu</h1>
            <div className="pizza-list">
                {pizzaList.map((pizza) => (
                    <div className="pizza-item" key={pizza.id}>
                        <h2>{pizza.name}</h2>
                        <p>{pizza.description}</p>
                    </div>))}
            </div>
        </div>
        </body>
    );
}