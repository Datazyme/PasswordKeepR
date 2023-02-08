const db = require('../connection');

const getPasswords = (object) => {
  return db.query('SELECT * FROM credentials WHERE user_id = $1 ORDER BY id', [object.id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getPasswords };
