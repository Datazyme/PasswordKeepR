const express = require('express');
const router  = express.Router();
const login = require('../db/queries/login');
// const { users } = require('../utilities/db');
// const UserHelper = require('../utilities/userHelper')(users);
// const router = express.Router();

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

/*
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = UserHelper.getUserByEmail(email, users);

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
*/

module.exports = router;
