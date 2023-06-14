const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

require('dotenv').config()

const port = process.env.NODE_DOCKER_PORT || 4000

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

app.get('/payment', async (req, res) => {
    const price = parseInt(req.query.price);
    const email = req.query.email;
    const address = req.query.address;
    const pizzas = req.query.pizzas;
    console.log(price);
    const stripeObj = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
        payment_method_types: ['card','blik'],
        line_items: [
            {
                price_data: {
                    currency: 'pln',
                    unit_amount: price*100,
                    product_data: {
                        name: 'Pizza',
                        description: 'zamówienie z restauracji :)',
                        images: ['app/my-app/public/margarita.png'],
                    },
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
    });
    console.log(stripeObj);
    res.send(stripeObj);
});
app.get('/getPizzas', (req, res) => {
    const sqlQuery =  'SELECT * FROM Menu';
    database.query(sqlQuery, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});
app.get('/order',(req,res)=>{
    const price = parseInt(req.query.price);
    const email = req.query.email;
    const address = req.query.address;
    const pizzas = req.query.pizzas;
    const sqlQuery =  'INSERT INTO Orders (price, email, address,pizzas_id) VALUES ('+price+', "'+email+'", "'+address+'", "'+pizzas+'")';
    database.query(sqlQuery, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})