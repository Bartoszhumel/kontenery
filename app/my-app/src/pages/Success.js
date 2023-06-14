import React, {useEffect} from 'react'
import {useSearchParams} from "react-router-dom";

export default function Success() {
    useEffect(() => {
        fetch('http://localhost:4000/order?price=' + sessionStorage.getItem('price') + '&email=' + sessionStorage.getItem('email') + '&address=' + sessionStorage.getItem('address')+'&pizzas='+sessionStorage.getItem('pizzas'), {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        }).then();
    }, []);
    return (
        <div className="App">
            <h1>Dziękujemy za zakup</h1>
        </div>
    );
}