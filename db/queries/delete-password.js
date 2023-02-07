const db = require('../connection');

const deletePassword = (id) => {
  return db.query(`DELETE FROM credentials WHERE id = $1 RETURNING *;`,
  [id])
    .then(data => {
      return data.rows
    });
};

module.exports = { deletePassword };
