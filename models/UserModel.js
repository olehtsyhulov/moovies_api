const pgClient = require('../utils/database');
class User {
  constructor(pgClient) {
    this.pgClient = pgClient;
  }
  async addUser(login, first_name, last_name, password, role) {
    await this.pgClient.query(`
        INSERT INTO users (login, first_name, last_name, password, role) VALUES(
        '${login}', '${first_name}', '${last_name}', '${password}', '${role}'
    )`);
  }

  async getUser(login) {
    const { rows } = await this.pgClient.query(`
        SELECT * FROM users WHERE login='${login}'`
    );

    return rows[0];
  }
}

//class UserStorage {
//    users = {};
//
//    constructor() {
//    }
//
//    addUser(user) {
//        this.users[user.getToken()] = {
//            role: user.getRole(),
//            id: user.getId(),
//        };
//    }
//
//    deleteUser(token) {
//        if (!token) {
//            return false;
//        }
//        delete this.users[token];
//        return true;
//    }
//
//    getTokenRoleByUserToken(token) {
//        if (!token) {
//            return;
//        }
//        return this.users[token].role;
//    }
//
//    getIdByUserToken(token) {
//        if (!token) {
//            return;
//        }
//        return this.users[token].id;
//    }
//}
//
module.exports =  new User(pgClient);
