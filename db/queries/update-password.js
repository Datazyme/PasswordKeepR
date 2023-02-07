const db = require('../connection');

const updatePassword = (object) => {
  return db.query(`
  UPDATE credentials
  SET website = $2, username = $3, password = $4, hint = $5, category = $6, require_master_password = $7
  WHERE id = $1
  RETURNING *;`,
  [object.id, object.website, object.username, object.password, object.hint, object.category, object.require_master_password])
    .then(data => {
      return data.rows
    });
};

module.exports = { updatePassword };
