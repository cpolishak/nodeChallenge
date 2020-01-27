## nodeChallenge
Coding challenge for NodeJS Developer position

# Instructions
1. Clone this repository.

2. Npm init 

3. Install necessary packages and add require statements for them. Use --save with your install commands to know what you have/don't
    - express
    - request
    - mocha
    - supertest
    - ejs
    - body-parser
    - dotenv

4. Create your .env file and set up your API key on there and make sure variable matches the key you use in your app.js file.

5. Go to [google places API](https://developers.google.com/places/web-service/intro)
    - create an account and project if necessary with google
    - get an API key and plug it into your own .env file and list it in the app.js file to enable the API calls.

6. Node app.js (or nodemon) to test server running (will get a cmd line console log).

7. run queries via console.log() in the node server to test the Google API calls responses in JSON format.

8. go to localhost:3000 or your chosen port (alter the variable accordingly) to see the front end.

9. For testing - You should have already installed mocha. But you need to change the "scripts" in your package.json to ``"test": "mocha",
    "watch": "mocha --watch *.js"``

