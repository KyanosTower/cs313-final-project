const express = require('express')
const { createConnection } = require('net')
const path = require('path')
var mysql = require('mysql');
const PORT = process.env.PORT || 5500
const app = express()

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'card'
});

app.get("/add", (req, res) => {
    var cardD = "The card's name is " + req.query.cardName + ", it is from the series " + req.query.seriesName + " and it's rarity is " + req.query.rarity + ". Can it evolve? " + req.query.evolve + ".";
    connection.connect(function (err) {
        //if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO card (cardName, seriesName, rarity, evolve) VALUES ?";
        var values = [
            [req.query.cardName, req.query.seriesName, req.query.rarity, req.query.evolve]
        ];
        connection.query(sql, [values], function (err, result) {
            //if (err) throw err;
            console.log("1 record inserted");
        });
    });
    res.render("pages/results", { answer: cardD });
});

app.get("/search", (req, res) => {
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
});

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/form', (req, res) => res.render('pages/index'))

app.listen(PORT, () => console.log(`Listening on ${PORT}`))