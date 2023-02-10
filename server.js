// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const app = express();

// Modules and Requires
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");
const loginHelperFunctions = require('./db/queries/login');

// load cookieSession parameters
app.use(cookieSession({
  name: 'session',
  keys: ["key1", "key2"],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  rolling: true
}))

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const loginRoutes = require('./routes/login');
const passwordRoutes = require('./routes/password');
const registerRoutes = require('./routes/register');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/login', loginRoutes);
app.use('/api/passwords', passwordRoutes);
app.use('/register', registerRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// sends a GET request and retrieve email if user is logged in
app.get('/', (req, res) => {
  loginHelperFunctions.getEmail(req.session.user_id)
    .then((response) => {
      const templatevars = {
        user: response[0]
      }
      res.render("index", templatevars);
    })
  });

  // sends a POST request to logout and reset cookies
  app.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });



