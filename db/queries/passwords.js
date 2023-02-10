const db = require('../connection');

const getPasswords = (object) => {
  return db.query(`
  SELECT organizations.name as organizations_name, credentials.*
  FROM credentials
  JOIN organizations ON organizations.id = organization_id
  WHERE user_id = $1
  ORDER BY credentials.id
  `, [object.id])
    .then(data => {
      return data.rows;
    });
};

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

const updatePassword = (object) => {
  return db.query(`
  UPDATE credentials
  SET website = $2, username = $3, password = $4, hint = $5, category = $6
  WHERE id = $1
  RETURNING *;`,
  [object.id, object.website, object.username, object.password, object.hint, object.category])
    .then(data => {
      return data.rows
    });
};

const deletePassword = (id) => {
  return db.query(`DELETE FROM credentials WHERE id = $1 RETURNING *;`,
  [id])
    .then(data => {
      return data.rows
    });
};

module.exports = { getPasswords, postPassword, updatePassword, deletePassword };
