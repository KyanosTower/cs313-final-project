const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8080
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/postal', (req, res) => res.render('pages/index'))

app.get("/calculate", (req, res) => {
    var total = calculateRate(req);
    res.render("pages/results", { answer: total });
});



app.listen(PORT, () => console.log(`Listening on ${PORT}`))


function calculateRate(req) {
    var ounces = req.query.ounces;
    var lettertype = req.query.lettertype;

    if (lettertype == "stamped") {
        if (+ounces == 1) {
            var total = "$.55";
        }
        if (+ounces == 2) {
            var total = "$.75";
        }
        if (+ounces == 3) {
            var total = "$.95";
        }
        if (+ounces > 3) {
            var total = "$1.15";
        }
        
    }

    if (lettertype == "metered") {
        if (+ounces == 1) {
            var total = "$.51";
        }
        if (+ounces == 2) {
            var total = "$.71";
        }
        if (+ounces == 3) {
            var total = "$.91";
        }
        if (+ounces > 3) {
            var total = "$1.11";
        }
    }

    if (lettertype == "envelops") {
        if (+ounces == 1) {
            var total = "$1.00";
        }
        if (+ounces == 2) {
            var total = "$1.20";
        }
        if (+ounces == 3) {
            var total = "$1.40";
        }
        if (+ounces == 4) {
            var total = "$1.60";
        }
        if (+ounces == 5) {
            var total = "$1.80";
        }
        if (+ounces == 6) {
            var total = "$2.00";
        }
        if (+ounces == 7) {
            var total = "$2.20";
        }
        if (+ounces == 8) {
            var total = "$2.40";
        }
        if (+ounces == 9) {
            var total = "$2.60";
        }
        if (+ounces == 10) {
            var total = "$2.80";
        }
        if (+ounces == 11) {
            var total = "$3.00";
        }
        if (+ounces == 12) {
            var total = "$3.20";
        }
        if (+ounces == 13) {
            var total = "$3.40";
        }
    }

    if (lettertype == "retail") {
        if (+ounces <= 4) {
            var total = "$4.00";
        }
        if (+ounces >= 5 && +ounces < 9) {
            var total = "$4.80"
        }
        if (+ounces >= 9 && +ounces < 13) {
            var total = "$5.50"
        }
        if (+ounces >= 13) {
            var total = "6.25"
        }
    }
    console.log(pounds);
    console.log(ounces);
    console.log(lettertype);
    console.log(total);

    return total;
}