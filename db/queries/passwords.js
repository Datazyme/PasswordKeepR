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

module.exports = { getPasswords };
