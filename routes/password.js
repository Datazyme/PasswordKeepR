const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  res.send('<p>hello everyone </p>');
});

router.post('/', (req, res) => {
console.log(req.body)
});

router.get('/new', (req, res) => {
  res.send('<p>hello new </p>');
});

module.exports = router;
