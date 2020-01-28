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
    - nock
    - ejs
    - body-parser
    - dotenv

4. Create your .env file and set up your API key on there and make sure variable matches the key you use in your app.js file. Or put your API key into your yaml file and plug in from there. (see next step)

5. Go to [google places API](https://developers.google.com/places/web-service/intro)
    - create an account and project if necessary with google
    - get an API key and plug it into your own .env file and list it in the app.js file to enable the API calls.

6. Node app.js (or nodemon) to test server running. Then you can test via console logs on the back end or try what I have gotten done on the front end to return the data.

7. For testing - You should have already installed mocha. But you need to change the "scripts" in your package.json to ``"test": "mocha --exit",
    "start": "node app.js"``

8. If I missed anything, feel free to reach out to me and let me know. I always strive to learn and get better!

