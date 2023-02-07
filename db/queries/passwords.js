const db = require('../connection');

const getPasswords = () => {
  return db.query('SELECT * FROM credentials ORDER BY id;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getPasswords };
