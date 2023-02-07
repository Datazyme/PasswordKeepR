function UserHelper(users) {
  return {
    generateId: function () {
      const lib = 'qwertyuiopasdfghjklzxcvbnm0123456789';
      let id = '';
      for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * lib.length);
        id += lib[index];
      }
      return id;
    },
    // get user by verifying email and password
    loginUser: function (email, password) {
      if (!email || !password) {
        return null;
      }
      return Object.values(users).find(u => {
        return u.email == email && u.password == password
      })
    },

    // find user by existing user_id
    findUser: function (user_id, userdb) {
      return userdb[user_id]
    },

    // to register a new user
    registerUser: function (email, password) {
      console.log(users)
      const id = this.generateId();
      users[id] = { id, email, password }

      return users[id]
    },

    getUserByEmail: function (email, userdb){
      for(let userid in userdb){
        if(userdb[userid].email === email){
          return userdb[userid]
        }
      }
      return undefined
    },

    getUserById: function (id, userdb){
      return userdb[id]

    }
  }
}

module.exports = UserHelper;