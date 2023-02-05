const db = require('../connection');

const getPasswords = () => {
  return db.query('SELECT * FROM credentials;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getPasswords };
