const express = require('express');
const mysql = require('mysql');
const { body, validationResult } = require('express-validator');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

require('dotenv').config()

const port = process.env.NODE_DOCKER_PORT || 4000

const YOUR_DOMAIN = 'http://localhost:4242';

const database = mysql.createConnection({
    host: "mysqldb",
    database: "restaurant",
    user: "username",
    password: "password",
    port: 3306
});

app.use(bodyParser.json());

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});


app.get('/', (req, res) => {

    res.send("Hello world");
});

app.get('/init', (req, res) => {
    const sqlQuery =  'CREATE TABLE IF NOT EXISTS emails(id int AUTO_INCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50), PRIMARY KEY(id))';

    database.query(sqlQuery, (err) => {
        if (err) throw err;

        res.send('Table created!')
    });
});
app.get('/payment', async (req, res) => {
    const price = parseInt(req.query.price);

    console.log(price);
    const stripeObj = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
        payment_method_types: ['card', 'p24'],
        line_items: [
            {
                price_data: {
                    currency: 'pln',
                    unit_amount: price*100,
                    product_data: {
                        name: 'Pizza',
                        description: 'zamówienie z restauracji :)',
                        images: ['https://example.com/t-shirt.png'],
                    },
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
    });
    res.send(stripeObj);
});
app.get('/getPizzas', (req, res) => {
    res.send([
        { 
            id: 1, 
            name: "Margarita",
            image: "margarita.png",
            description: "Ser, sos pomidorowy, oregano",
            smallPrice: 15,
            mediumPrice: 20,
        },
        { 
            id: 2, 
            name: "Capriciosa",
            image: "capriciosa.png",
            description: "Ser, sos pomidorowy, szynka, pieczarki, oregano",
            smallPrice: 15,
            mediumPrice: 20,
        },
        { 
            id: 3, 
            name: "Pepperoni",
            image: "pepperoni.png",
            description: "Ser, sos pomidorowy, pepperoni, oregano",
            smallPrice: 15,
            mediumPrice: 20,
        },
        { 
            id: 4, 
            name: "Vegetariana",
            image: "vegetariana.png",
            description: "Ser, sos pomidorowy, papryka, kukurydza, pieczarki, oregano",
            smallPrice: 15,
            mediumPrice: 20,
        }
    ]);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})