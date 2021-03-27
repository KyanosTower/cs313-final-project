const express = require('express');
const { createConnection } = require('net');
const path = require('path');
var mysql = require('mysql');
const PORT = process.env.PORT || 5500
const app = express();
const { Client } = require("pg");

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const connectionString = process.env.DATABASE_URL;

const client = new Client({
    connectionString: connectionString, ssl: {
        rejectUnauthorized: false
    }
});
client.connect();

client.query('SELECT * FROM card', (err,res) => {
    if (err) throw err;
    for (let row of res.row) {
        console.log
    }
})

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'card'
});

app.get("/add", (req, res) => {
    var cardD = "The card's name is " + req.query.cardName + ", it is from the series " + req.query.seriesName + " and it's rarity is " + req.query.rarity + ". Can it evolve? " + req.query.evolve + ".";
    connection.connect(function (err) {
        //if (err) throw err
        console.log('You are now connected...')

        var sql = "INSERT INTO card (cardName, seriesName, rarity, evolve) VALUES ?";
        var values = [req.query.cardName, req.query.seriesName, req.query.rarity, req.query.evolve];
        connection.query(sql, values, function(err, result) {
            console.log("Inserted");
        });
    })
    client.query('SELECT * FROM card', (err,res) => {
        //if (err) throw err;
        for (let row of res.row) {
            console.log(JSON.stringify(row));
        }
    });
    client.end();
    res.render("pages/results", { answer: cardD });
});

/*app.get("/search", (req, res) => {
    var cardD = "The card's name is " + req.query.cardName + ", it is from the series " + req.query.seriesName + " and it's rarity is " + req.query.rarity + ". Can it evolve? " + req.query.evolve + ".";
    connection.connect(function (err) {
        //if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT cardName, seriesName, rarity, evolve FROM card WHERE ?";
        var values = [
            req.query.txtSearch
        ]
        connection.query(sql, [values], function (err, result) {
            //if (err) throw err;
            console.log("Records Found.");
        });
    });
    res.render("public/form", { answer: results });
});*/

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/form', (req, res) => res.render('pages/index'))

app.listen(PORT, () => console.log(`Listening on ${PORT}`))