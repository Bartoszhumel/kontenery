import React, {useEffect} from 'react'
import {useSearchParams} from "react-router-dom";

export default function Success() {
    const searchParams = useSearchParams();
    const price = searchParams.get('price');
    const email = searchParams.get('email');
    const address = searchParams.get('address');
    useEffect(() => {
        fetch('http://localhost:4000/order?price=' + price + '&email=' + email + '&address=' + address, {
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