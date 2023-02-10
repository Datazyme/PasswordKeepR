const express = require('express');
const router  = express.Router();
const passwordHelperFunctions = require('../db/queries/passwords.js');
const loginHelperFunctions = require('../db/queries/login.js')

// sends a GET request to pull stored username and passwords from the database for the logged in user then converts the returned data to JSON
router.get('/', (req, res) => {
  const userId = { id: req.session.user_id }
  console.log(req.session.user_id)
  passwordHelperFunctions.getPasswords(userId)
    .then(passwords => {
      res.json({ passwords });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// sends a POST request query to seed new website username and password to database
router.post('/', (req, res) => {
  passwordHelperFunctions.postPassword(req.body, req.session.user_id)
  // helper function to provide current logged in user email to templatevars
  loginHelperFunctions.getEmail(req.session.user_id)
    .then((response) => {
      const templatevars = {
        user: response[0]
      }
      res.render("index", templatevars);
    })
});

// sends a POST request query to delete the selected username and password from the database
router.post('/delete', (req, res) => {
  passwordHelperFunctions.deletePassword(req.body.password_id)
  // helper function to provide current logged in user email to templatevars
  loginHelperFunctions.getEmail(req.session.user_id)
    .then((response) => {
      const templatevars = {
        user: response[0]
      }
      res.render("index", templatevars);
    })
});

// sends a POST request query to update the selected username and password from the database
router.post('/edit', (req, res) => {
  passwordHelperFunctions.updatePassword(req.body)
  // helper function to provide current logged in user email to templatevars
  loginHelperFunctions.getEmail(req.session.user_id)
  .then((response) => {
    const templatevars = {
      user: response[0]
    }
    res.render("index", templatevars);
  })
});

module.exports = router;
