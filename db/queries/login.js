const db = require('../connection');

const getUserLogin = (object) => {
  return db.query(`
  SELECT users.id as user_id, organizations.name as organization, users.name as name, users.email as email, users.master_password as password, users.master_password_hint as hint
  FROM users
  JOIN organizations ON organizations.id = organization_id
  WHERE email = $1 AND master_password = $2
  ORDER BY organization;
  `, [object.email, object.password])
    .then(data => {
      // console.log(data.rows === [] ? 'truthy' : 'user not found!')
      return data.rows
    })
};

// getUserLogin({email: 'lleband1@earthink.net', password: 'kteiB6r'})

module.exports = { getUserLogin };
