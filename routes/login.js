const express = require('express');
const router  = express.Router();
const login = require('../db/queries/login');

// router.get('/', (req, res) => {
//   res.render('login');
// });

// login routes
router.get('/', (req, res) => {
  if (req.session.user_id) {
    return res.redirect("/");
  }
  const templatevars = {
    user: null,
  };
  res.render('login', templatevars);
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send("Please provide a valid email and password");
  }

  login.getUserLogin({email, password})
    .then((response) => {
      if (response.length === 0) {
        return res.status(400).send("Incorrect email/password or no user found with that account!");
      }
      req.session.user_id = response[0].user_id;
      res.redirect("/");
    })
});

module.exports = router;
