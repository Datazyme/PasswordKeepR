const express = require('express');
const router  = express.Router();
const passwordGET = require('../db/queries/passwords');
const passwordPOST = require('../db/queries/new-password');
const passwordDELETE = require('../db/queries/delete-password');
const passwordUPDATE = require('../db/queries/update-password');

router.get('/', (req, res) => {
  // jerome's code
  //passwordQueries runs the query in /db/queries/passwords.js then converts the returned data into JSON format
  passwordGET.getPasswords()
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
  passwordPOST.postPassword(req.body)
  res.render('index')
});

router.post('/delete', (req, res) => {
  passwordDELETE.deletePassword(req.body.password_id)
  res.render('index')
});

router.post('/edit', (req, res) => {
  // console.log('edited')
  // console.log(req.body)
  passwordUPDATE.updatePassword(req.body)
  res.render('index')
});

router.get('/new', (req, res) => {
  res.send('<p>hello new </p>');
});

module.exports = router;
