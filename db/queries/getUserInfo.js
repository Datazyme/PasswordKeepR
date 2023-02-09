const db = require('../connection');

const getUser = (id) => {
  return db.query(`
  SELECT users.id as id, users.email as email
  FROM users
  WHERE id = $1
  `, [id])
    .then(data => {
      // console.log(data.rows)
      return data.rows
    })
};


module.exports = { getUser };
