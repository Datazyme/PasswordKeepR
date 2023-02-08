// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const { users } = require("./utilities/db.js");
const userHelper = require("./utilities/userHelper.js")(users);
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const app = express();
const cookieSession = require("cookie-session");
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
  const templatevars = {
    user: userHelper.getUserById(req.session.user_id, users)
  }
  res.render("index", templatevars);
});


// login routes
app.get('/login', (req, res) => {
  if (req.session.user_id) {
    return res.redirect("/");
  }
  const templatevars = {
    user: null,
  };
  res.render('login', templatevars);
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = userHelper.getUserByEmail(email, users);

  console.log(req.body)
  if (!email || !password) {
    return res.status(400).send("Please provide a valid email and password");
  }
  if (!user) {
    return res.status(400).send("No user found with that email");
  }
  if (user.password !== password) {
    return res.status(400).send("Incorrect password");
  }
  req.session.user_id = user.id;
  res.redirect("/");
});

// Register page
app.get("/register", (req, res) => {
  if (req.session.user_id) {
    res.redirect("/");
    return;
  }
  const templatevars = { user: null};
  res.render("register", templatevars);
});



app.post("/register", (req, res) => {
  const userEmail = req.body.email;
  const password = req.body.password;

  if (!userEmail || !password) {
    return res.status(400).send("please provide an email and a password");
  }
  if (userHelper.getUserByEmail(userEmail, users)) {
    return res.status(400).send("Email is already registered");
  }

  const user = userHelper.registerUser(userEmail, password)
  req.session.user_id = user.id;
  res.redirect("/")
});



// POST /logout
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
