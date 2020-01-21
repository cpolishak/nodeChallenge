const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
require("dotenv").config({path: "./.env"});

app.use(express.static(__dirname ));

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');

// JEST TESTING // 
// function sum(a, b) {
//     return a + b;
// };
// console.log(sum(1,2));

// INDEX ROUTE //
app.get("/", function(req, res) {
    res.render("../views/index.ejs");
});

// RESULTS ROUTE //

// Text Search style search //
app.get('/results', function(req, res) {
    var query = req.query.search
    var key = process.env.GOOGLE_API_KEY;
    var urlTxtSearch = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + query + "&key=" + key;

    request(urlTxtSearch, function(error, response, body){
        if(!error && response.statusCode == 200) {
            let data = JSON.parse(body);
            res.render("results.ejs", {data: data});
            // console.log(data.results);
        } else {
            console.log(error);
        }
    });
});

// Autocomplete style search //
// app.get('/results', function(req, res) {
//     var query = req.query.search
//     var key = process.env.GOOGLE_API_KEY;
//     var urlAutoComp = "https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=" + key + "&input=" + query;
//     request(urlAutoComp, function(error, response, body){
//         if(!error && response.statusCode == 200) {
//             let data = JSON.parse(body);
//             res.render("results.ejs", {data: data});
//             console.log(data.predictions);
//         } else {
//             console.log(error);
//         }
//     });
// });

// LISTENER //
var port = process.env.PORT || 3000;
app.listen(port || process.env.PORT, process.env.IP, function(){
    console.log("App server is running!");
});

// EXPORT FOR JEST TESTING //
// module.exports = sum;

