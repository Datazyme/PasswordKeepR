const db = require('../connection');

const postPassword = (object, user_id) => {
  return db.query(`
  INSERT INTO credentials (user_id, organization_id, role_id, is_user_created, website, username, password, hint, category)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING *;`,
  [user_id, object.organization_id, object.role_id, object.is_user_created, object.website, object.username, object.password, object.hint, object.category])
    .then(data => {
      return data.rows
    });
};

module.exports = { postPassword };
