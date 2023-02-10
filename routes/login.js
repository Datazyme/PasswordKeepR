const express = require('express');
const router  = express.Router();
const loginHelperFunctions = require('../db/queries/login');

// sends GET request to render login page and redirects to index.js if user is already logged in
router.get('/', (req, res) => {
  if (req.session.user_id) {
    return res.redirect("/");
  }
  const templatevars = {
    user: null,
  };
  res.render('login', templatevars);
});

// sends POST request from login page and check if email and password match with database
router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send("Please provide a valid email and password");
  }

  loginHelperFunctions.checkUserLogin({email, password})
    .then((response) => {
      if (response.length === 0) {
        return res.status(400).send("Incorrect email/password or no user found with that account!");
      }
      req.session.user_id = response[0].user_id;
      res.redirect("/");
    });
});

module.exports = router;
