const express = require('express');
const router  = express.Router();
const register = require('../db/queries/register');
const check = require('../db/queries/emailCheck');

// router.get('/', (req, res) => {
//   res.render('register');
// });

// Register page
router.get("/", (req, res) => {
  if (req.session.user_id) {
    res.redirect("/");
    return;
  }
  const templatevars = { user: null};
  res.render("register", templatevars);
});

router.post("/", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  const organization_id = req.body.organization;

  if (!email || !password) {
    return res.status(400).send("Please provide a valid email and password");
  }

  check.ifEmailExist(email)
    .then((response) => {
    const registerEmailCheck = response.length === 0 ? null : response[0].email;
      if (registerEmailCheck === email) {
        return res.status(400).send("Email is already registered!");
      }
      register.registerUser({organization_id, email, password})
        .then((response) => {
          console.log(response)
          register.enrollDefaultLogins({user_id: response[0].id, organization_id})
          req.session.user_id = response[0].id;
          res.redirect("/")
      })
  })

});

module.exports = router;
