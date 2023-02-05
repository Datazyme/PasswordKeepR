const db = require('../connection');

const deletePassword = (object) => {
  return db.query(`DELETE FROM credentials WHERE id = $1 RETURNING *;`,
  [object.id])
    .then(data => {
      return data.rows
    });
};

module.exports = { deletePassword };
