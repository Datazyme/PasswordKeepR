const express = require('express');
const router  = express.Router();
const passwordGET = require('../db/queries/passwords');
const passwordPOST = require('../db/queries/new-password');
const passwordDELETE = require('../db/queries/delete-password');
const passwordUPDATE = require('../db/queries/update-password');
const user = require('../db/queries/getUserInfo.js');

router.get('/', (req, res) => {
  // jerome's code
  //passwordQueries runs the query in /db/queries/passwords.js then converts the returned data into JSON format
  const userId = { id: req.session.user_id }
  console.log(req.session.user_id)
  passwordGET.getPasswords(userId)
    .then(passwords => {
      res.json({ passwords });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  passwordPOST.postPassword(req.body, req.session.user_id)
  const templatevars = {
    user: userHelper.getUserById(req.session.user_id, users)
  }
  res.render('index', templatevars)
});

router.post('/delete', (req, res) => {
  passwordDELETE.deletePassword(req.body.password_id)
  const templatevars = {
    user: userHelper.getUserById(req.session.user_id, users)
  }
  res.render('index', templatevars)
});

router.post('/edit', (req, res) => {
  passwordUPDATE.updatePassword(req.body)
  const templatevars = {
    user: userHelper.getUserById(req.session.user_id, users)
  }
  res.render('index', templatevars)
});

router.get('/new', (req, res) => {
  res.send('<p>hello new </p>');
});

module.exports = router;
