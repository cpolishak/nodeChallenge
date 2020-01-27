const express = require("express");
const app = express();
const request = require("request");
const yaml = require("js-yaml");
const fs = require("fs");
const bodyParser = require("body-parser");
const doc = yaml.safeLoad(fs.readFileSync("./data.yaml", "utf8"));
const bank1 = doc.banks.sunrise;

require("dotenv").config({path: "./.env"});

app.use(express.static(__dirname ));

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');

// Mocha TESTING // 
function doubleInt(value) {
    if(typeof value !== "number") {
        throw "not a number";
    } 
    return value * 2;
};


// INDEX ROUTE //
app.get("/", function(req, res) {
    // Show all banks in yaml
    // console.log(doc.banks);
    // textData = JSON.stringify(doc);
    res.render("../views/index.ejs"); // could add {textData: textData} into render to show the stringified text of the yaml file
});

// RESULTS ROUTE //
// Text Search style search //
app.get("/results", function(req, res) {
    var query = req.query.search;
    // var lat = req.query.latitude;
    // var long = req.query.longitude;
    // var type = req.query.type;
    var key = process.env.GOOGLE_API_KEY;
    var urlTxtSearch = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + query + "&key=" + key;
    // var urlPlaceSearch = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=1500&type=bank" + "&keyword=" + query + "&key=" + key;

    request(urlTxtSearch, function(error, response, body){
        if(!error && response.statusCode == 200) {
            let data = JSON.parse(body);
            res.render("results.ejs", {data: data});
            // console.log(data.results);
        } 
        // else if(req == "sunrise"+"bank") {
        //     let body = JSON.stringify(bank1);
        //     res.render("results.ejs", {body, data2});
        // } else if(req == "happy"+"credit") {
        //     res.render("results.ejs", {doc, data3});
        // } else if(req == "paris"+"fcu") {
        //     res.render("results.ejs", {doc, data4});
        // } 
        {
            console.log(error);
        }
    });

    // request(urlPlaceSearch, function(error, response, body){
    //     if(!error && response.statusCode == 200) {
    //         let data = JSON.parse(body);
    //         // let show = JSON.stringify(data);
    //         res.render("results.ejs", {data: data});
    //         console.log(data.results);
    //         // for (i in data) {
    //         //     x = data[i];
    //         //     console.log(x);
    //         // }
    //     } {
    //         console.log(error);
    //     }
    // });
});



// app.get("/results", function(req,res,body) {
//     var query = req.query.search;
//     var key = process.env.GOOGLE_API_KEY;
//     var urlTxtSearch = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + query + "&key=" + key;
//     var doc = yaml.safeLoad(fs.readFileSync("./data.yaml", "utf8"));
//     let sdata = JSON.stringify(doc);
//     // const bank1 = doc.banks.sunrise;
//     // const bank2 = doc.banks.happy;
//     // const bank3 = doc.banks.paris;
//     console.log(sdata);

//     // request(urlTxtSearch, function(error, response, body) {
//     req (function(error, res) {
//         if(query == "sunrise" + "bank") {
//             let rdata = sdata;
//             res.render("results.ejs", {rdata: data});
//         } else if (query == "happy credit union") {
//             let data = JSON.parse(bank2);
//             res.render("results.ejs", {data: data});
//         } else if (query == "paris fcu") {
//             let data = JSON.parse(bank3);
//             res.render("results.ejs", {data: data});
//         } {
//             console.log(error)
//         }
//     })
//         // else if (!error && response.statusCode == 200) {
//         //     let data = JSON.parse(body);
//         //     res.render("results.ejs", {data: data});
//         // }
//     // })
// });

// BACKEND FUNCTION TO BUILD //
// function searchBanksAndGeolocation() {
//     // Take user input (1 of the 3 banks in config)
//     try {
//         var doc = yaml.safeLoad(fs.readFileSync("./data.yaml", "utf8"));
//         const bank1 = doc.banks.sunrise;
//         const bank2 = doc.banks.happy;
//         const bank3 = doc.banks.paris;

//         // Return customer name, type, language, response output & number of nearby locations
//         bank1.forEach(element => console.log(element));
//         // bank2.forEach(element => console.log(element));
//         // bank3.forEach(element => console.log(element));
//     } catch (e) {
//         console.log(e);
//     }
// } searchBanksAndGeolocation()



// YAML Stuff //
// function yamlTest () {
//     try{
//         var doc = yaml.safeLoad(fs.readFileSync("./data.yaml", "utf8"));
//         console.log(doc);
        
//     } catch (e) {
//         console.log(e);
//     }
// }
// yamlTest();



// LISTENER //
var port = process.env.PORT || 3000;
app.listen(port || process.env.PORT, process.env.IP, function(){
    console.log("App server is running!");
});

// EXPORT FOR MOCHA TESTING //
module.exports = doubleInt;

