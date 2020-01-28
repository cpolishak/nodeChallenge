const express = require("express");
const app = express();
const request = require("request");
const yaml = require("js-yaml");
const fs = require("fs");
const bodyParser = require("body-parser");
const nock = require('nock');
const doc = yaml.safeLoad(fs.readFileSync("./data.yaml"));

require("dotenv").config({path: "./.env"});

app.use(express.static(__dirname ));

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');

// ** BACK END SEARCH / LOGS ** //
// Routing Test function
// function bankTest () {
//     var query = "happy"
//     const bankInfo = doc.banks[query];
//     if (!bankInfo) {
//         res.send(`Error, config for customer: "${query}" does not exist.`);
//     } else {
//         const apiKey = bankInfo.API_Key;
//         const type = (bankInfo.type === 'all') ? 'bank,atm' : bankInfo.type;
//         const language = bankInfo.language;
//         const response_output = bankInfo.response_output;
//         const numbLocationstoReq = bankInfo.numbLocationstoReq;

//         console.log(`apiKey: ${apiKey}`);
//         console.log(`type: ${type}`);
//         console.log(`language: ${language}`);
//         console.log(`response_output ${response_output}`);
//         console.log(`numbLocationstoReq: ${numbLocationstoReq}`);
//     }
// } bankTest();


// INDEX ROUTE //
app.get("/", function(req, res) {
    res.render("../views/index.ejs"); 
});


// ** FRONT END SEARCH for results ** //
// Text Search style search //
app.get("/results", function(req, res) {
    var query = req.query.search;
    var lat = req.query.latitude;
    var long = req.query.longitude;
    const bankInfo = doc.banks[query];
    // const googKey = doc.banks.googKey;

    console.log(`search: ${query}`);
    console.log(`lat: ${lat}`);
    console.log(`long: ${long}`);

    if (!bankInfo) {
        res.send(`Error, config for customer: "${query}" does not exist.`);
        console.log("Specified customer does not exist");
    } else {
        const customer_name = bankInfo.customer_name;
        const apiKey = bankInfo.API_Key;
        const type = (bankInfo.type === 'all') ? 'bank,atm' : bankInfo.type;
        const language = bankInfo.language;
        const response_output = bankInfo.response_output;
        const numbLocationstoReq = bankInfo.numbLocationstoReq;

        console.log(`name: ${customer_name}`);
        console.log(`apiKey: ${apiKey}`);
        console.log(`type: ${type}`);
        console.log(`language: ${language}`);
        console.log(`response_output: ${response_output}`);
        console.log(`numbLocationstoReq: ${numbLocationstoReq}`);
        // var type = req.query.type;
        // var urlTxtSearch = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + query + "&key=" + apiKey;

        var urlPlaceSearch = "https://maps.googleapis.com/maps/api/place/nearbysearch/" + response_output + "?location=" + lat + "," + long + "&radius=3000" + "&type=" + "atm" + "&language=" + language + "&pagetoken=" + numbLocationstoReq + "&keyword=" + query + "&key=" + apiKey;
        
    
        request(urlPlaceSearch, function(error, response, body){
            if(!error && response.statusCode == 200) {
                let data = JSON.parse(body) || parseXML(body);
                // let show = JSON.stringify(data);
                res.render("results.ejs", {data: data} );
                console.log(`data.results.length: ${data.results.length}`);
                for (i in data.results) {
                    x = data.results[i];
                    console.log(x.name);
                }
            } {
                console.log(error);
            }
        });
    }
});

// Mocha TESTING // 
function doubleInt(value) {
    if(typeof value !== "number") {
        throw "not a number";
    } 
    return value * 2;
};

// LISTENER //
var port = process.env.PORT || 3000;
app.listen(port || process.env.PORT, process.env.IP, function(){
    console.log("App server is running!");
});

// EXPORT FOR MOCHA TESTING //
module.exports = app, doubleInt;

