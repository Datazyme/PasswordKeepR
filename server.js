// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

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
  res.render('index');
});


// login routes

app.get("/login", (req, res) => {
  if(req.session.user_id){
    return res.redirect("/urls")
  }
  const templatevars = {
    user: null,
  };
  res.render("urls_login", templatevars);
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Verify the username and password


  // Render the login page template with the entered username
  res.render('login', { username: username });
});

// register page
app.get("/register", (req, res) => {
  if(req.session.user_id){
    res.redirect("/");
    return
  }
  const templatevars = { user: null};
  res.render("urls_register", templatevars);
});

app.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // Validate the user information
  // ...

  // Save the user information to a database
  // ...

  // Render the registration success page
  res.render('register', { username: username, email: email });
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
