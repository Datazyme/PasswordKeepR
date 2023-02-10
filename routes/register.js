const express = require('express');
const router  = express.Router();
const registerHelperFunctions = require('../db/queries/register');

// sends GET request to render register page and redirects to index.js if user is already logged in
router.get("/", (req, res) => {
  if (req.session.user_id) {
    res.redirect("/");
    return;
  }
  const templatevars = { user: null};
  res.render("register", templatevars);
});

// sends a POST request query to seed new user account email and password to database
router.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const organization_id = req.body.organization;

  if (!email || !password) {
    return res.status(400).send("Please provide a valid email and password");
  }

  //checks if email already exist in the database otherwise proceed to register user
  registerHelperFunctions.checkIfEmailExist(email)
    .then((response) => {
      const emailCheckResults = response.length === 0 ? null : response[0].email;
      if (emailCheckResults === email) {
        return res.status(400).send("Email is already registered!");
      }
      registerHelperFunctions.registerUser({organization_id, email, password})
        .then((response) => {
          console.log(response);
          registerHelperFunctions.enrollDefaultLogins({user_id: response[0].id, organization_id});
          req.session.user_id = response[0].id;
          res.redirect("/");
        });
    });
});

module.exports = router;
