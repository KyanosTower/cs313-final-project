const express = require('express');
const { createConnection } = require('net');
const path = require('path');
var mysql = require('mysql');
const PORT = process.env.PORT || 5500
const app = express();
const { Client } = require("pg");
const { query } = require('express');

const connectionString = process.env.DATABASE_URL;

const client = new Client({
    connectionString: connectionString, ssl: {
        rejectUnauthorized: false
    }
});
client.connect();

app.get("/add", (req, res) => {
    var cardD = "The card's name is " + req.query.cardName + ", it is from the series " + req.query.seriesName + " and it's rarity is " + req.query.rarity + ". Can it evolve? " + req.query.evolve + ".";
    client.query(
        'INSERT into card (cardName, seriesName, rarity, evolve) VALUES($1, $2, $3, $4)',
        [req.query.cardName, req.query.seriesName, req.query.rarity, req.query.evolve],
        function (err, result) {
            console.log(":(");
            client.end();
        }
    );
    res.render("pages/results", { answer: cardD });
});

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/form', (req, res) => res.render('pages/index'))

app.listen(PORT, () => console.log(`Listening on ${PORT}`))