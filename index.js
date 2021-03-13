const express = require('express')
const { createConnection } = require('net')
const path = require('path')
var mysql = require('mysql');
const PORT = process.env.PORT || 5500
const app = express()

/*var connection = mysql.createConnection({
    host: 'localhost',
    database: 'card'
});

connection.connect();*/

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/form', (req, res) => res.render('pages/index'))

app.get("/add", (req, res) => {
    var card = {
        name: req.body.cardName,
        series: req.body.seriesName,
        rarity: req.body.rarity,
        evolve: req.body.evolve
    }
    /*connection.query('INSERT INTO card SET ?', card, function(err, resp) {
        if (err) throw err;
        res.send('Added to the Database');
    });*/
    res.send('Data recieved succesfully');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`))