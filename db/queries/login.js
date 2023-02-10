const db = require('../connection');

const checkUserLogin = (object) => {
  return db.query(`
  SELECT users.id as user_id, organizations.name as organization, users.name as name, users.email as email, users.master_password as password, users.master_password_hint as hint
  FROM users
  JOIN organizations ON organizations.id = organization_id
  WHERE email = $1 AND master_password = $2
  ORDER BY organization;
  `, [object.email, object.password])
    .then(data => {
      return data.rows
    })
};

const getEmail = (id) => {
  return db.query(`
  SELECT users.id as id, users.email as email
  FROM users
  WHERE id = $1
  `, [id])
    .then(data => {
      return data.rows
    })
};

module.exports = { checkUserLogin, getEmail };
