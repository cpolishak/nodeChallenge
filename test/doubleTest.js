const assert = require("assert");
const request = require("request");
const nock = require('nock');
const supertest = require('supertest');
const app = require("../app");
// const doubleInt = require("../app");

// Simple function tests //
// describe("1. Let's test doubleInt function", () => {
//   // happy case 1
//   it("1a. should return double of a positive number passed in", () => {
//       var result = doubleInt(4);
//       assert.equal(result, 8);
//   });
//   // happy case 2
//   it("1b. double a negative number", () => {
//       var result = doubleInt(-10);
//       assert.equal(result, -20);
//   });
//   // happy case 3 
//   it("1c. fails on strings", () => {
//       assert.throws(function() {
//           doubleInt("ACC");
//       });
//   });
// });


// TEST app.get //
describe("1. Test the app.get function", () => {
    describe("GET /results", () => {
        //happy case 1
        it("1a. returns status code 200", () => {
            var query = "wells";
            var key = process.env.GOOGLE_API_KEY;
            var urlTxtSearch = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + query + "&key=" + key;
            request.get(urlTxtSearch, function(error, response, body) {
                assert.equal(200, response.statusCode);
            })
        });
        //happy case 2
        it("1b. returns !error", () => {
            var query = "bank";
            var key = process.env.GOOGLE_API_KEY;
            var urlTxtSearch = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + query + "&key=" + key;
            request.get(urlTxtSearch, function(error, response, body) {
                expect(response.body, !error);
            })
        });
        // Stubbing test case 1 
        describe('unit testing /getAPIResponse route', function() {
            describe('testing with a dummy json', function(){
                before(function(){
                    /*
                    Mock API using nock for the REST API
                    Endpoint. Any calls to URL https://jsonplaceholder.typicode.com
                    will be intercepted by the fake_api nock  
                    */
                    const query = "sunrise";
                    const key = "AIzaSyAWwP5yH9Hke0FQkwEUujx-L8QelE27ZpY"
                    let fake_api = nock("https://maps.googleapis.com/maps/api/place/nearbysearch/" + "&keyword=sunrise&key=AIzaSyAWwP5yH9Hke0FQkwEUujx-L8QelE27ZpY")
                    .get('/results', function(req, res) { 
                        res.json({
                            customer_name: "Sunrise Bank",
                            API_Key: "AIzaSyAWwP5yH9Hke0FQkwEUujx-L8QelE27ZpY",
                            type: "atm",
                            language: "en",
                            response_output: "xml",
                            numbLocationstoReq: 200
                            })
                    })
                    .reply(200, json.type);
                })
                it('should return the expected json response', async function(){
                    let response = await supertest(app).get('/results')
                    /* Checking if the response has OK status code*/
                    assert(response.statusCode, 200)
                    /* Checking for the type returned from the fake_api */
                    assert(response.body.type, {type: "atm"})
                    })
                after(function(){
                    /* Once the uni test case has executed, clean up the nock.
                    Now calls to the URL https://jsonplaceholder.typicode.com
                    won't be intercepted. 
                    */
                    nock.cleanAll();
              })
            })
        });

    });
});

