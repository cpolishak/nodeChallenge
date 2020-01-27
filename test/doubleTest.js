const assert = require("assert");
const doubleInt = require("../app");
const request = require("request");


describe("1. Let's test doubleInt function", () => {
  // happy case 1
  it("1a. should return double of a positive number passed in", () => {
      var result = doubleInt(4);
      assert.equal(result, 8);
  });
  // happy case 2
  it("1b. double a negative number", () => {
      var result = doubleInt(-10);
      assert.equal(result, -20);
  });
  // happy case 3 
  it("1c. fails on strings", () => {
      assert.throws(function() {
          doubleInt("ACC");
      });
  });
});


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
                assert.equal(result, !error);
            })
        })
    });
});

