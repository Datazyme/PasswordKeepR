const db = require('../connection');

const postPassword = (object) => {
  return db.query(`
  INSERT INTO credentials (user_id, organization_id, role_id, is_user_created, website, username, password, hint, category, require_master_password)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING *;`,
  [object.user_id, object.organization_id, object.role_id, object.is_user_created, object.website, object.username, object.password, object.hint, object.category, object.require_master_password])
    .then(data => {
      return data.rows
    });
};

module.exports = { postPassword };
