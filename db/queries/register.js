const db = require('../connection');

const registerUser = (object) => {
  return db.query(`
  INSERT INTO users (organization_id, role_id, name, email, master_password, master_password_hint, is_active)
  VALUES ($1, 3, 'null', $2, $3, null, true)
  RETURNING *;`,
  [object.organization_id, object.email, object.password])
    .then(data => {
      // console.log(data.rows)
      return data.rows
    });
};

const enrollDefaultLogins = (object) => {
  return db.query(`
  INSERT INTO credentials (user_id, organization_id, role_id, is_user_created, website, username, password, hint, category, require_master_password)
  VALUES
    ($1, $2, 3, false, 'http://deviantart.com', 'kgrewer0', 'nd0yRH', 'throughput', 'Social Media', false),
    ($1, $2, 3, false, 'http://tinyurl.com', 'hbreckin1', 'vtyU2ScYM5y', 'pricing structure', 'Work', true),
    ($1, $2, 3, false, 'https://scribd.com', 'colivazzi2', 'Gx26uh9', null, 'Entertainment', false),
    ($1, $2, 3, false, 'https://earthlink.net', 'llailey3', '6whmJT6mF', 'heuristic', 'Game', false),
    ($1, $2, 3, false, 'https://google.cn', 'pmatuska4', 'aG2m571C', null, 'Work', true)
  RETURNING *;`,
  [object.user_id, object.organization_id])
    .then(data => {
      // console.log(data.rows)
      return data.rows
    });
}

// registerUser({organizations_id: 1, email: 'email.com', password: '4321'})

module.exports = { registerUser, enrollDefaultLogins };
