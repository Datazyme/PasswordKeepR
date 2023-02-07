// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const { users } = require("./utilities/db.js");
const userHelper = require("./utilities/userHelper.js")(users);
const PORT = process.env.PORT || 8080;
const app = express();

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

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const passwordRoutes = require('./routes/password');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/api/passwords', passwordRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {

    res.render("index", {users:users});
});


// login routes

app.get('/login', (req, res) => {
  if(req.session.user_id){
    return res.redirect("/urls")
  }
  const templatevars = {
    user: null,
  };
  res.render('login', templatevars);
});

app.post('/login', (req, res) => {
  const useremail = req.body.username;
  const password = req.body.password;

  if (!useremail || !password) {
    return res.status(400).send("must fill out valid email and password");
  }
  if (useremail === undefined) {
    return res.status(400).send("No user found with that email");
  }

  res.redirect("/");
});


// register page
app.get("/register", (req, res) => {
  if(req.session.user_id){
    res.redirect("/");
    return
  }
  const templatevars = { user: null};
  res.render("/register", templatevars);
});

app.post('/register', (req, res) => {
  const useremail = req.body.email;
  const password = req.body.password;
  const currentUser = userHelper.getUserByEmail(useremail, users);
  // Validate the user information

  if (!useremail || !password) {
    return res.status(400).send("please provide an email and a password");
  }
  if (currentUser) {
    return res.status(400).send("Email is already registered");
  }
  // Save the user information to a database
  users = {
    email: useremail,
    password: password,
  };

  req.session.user_id = id;
  res.redirect("/index")
});


// POST /logout
app.post("/logout", (req, res) => {

  req.session = null
  // send the user somewhere
  res.redirect("/login");
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
