const db = require('../connection');

const ifEmailExist = (email) => {
  return db.query(`
  SELECT users.email as email
  FROM users
  WHERE email = $1;
  `, [email])
    .then(data => {
      // console.log(data.rows)
      return data.rows
    })
};


module.exports = { ifEmailExist };
