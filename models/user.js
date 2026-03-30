//Core modules
const fs = require("fs");
const path = require("path");

//Local modules
const rootDir = require("../utils/path");

module.exports = class User {
  constructor(username, email, role, password) {
    this.username = username;
    this.email = email;
    this.role = role;
    this.password = password;
  }

  save() {
    const userFilePath = path.join(rootDir, "data", "users.json");
    User.fetchAll((users) => {
      users.push(this);
      fs.writeFile(userFilePath, JSON.stringify(users), (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  }

  static fetchAll(callback) {
    const userFilePath = path.join(rootDir, "data", "users.json");
    fs.readFile(userFilePath, (err, data) => {
      if (err) {
        callback([]);
        return;
      }

      try {
        callback(JSON.parse(data));
      } catch {
        callback([]);
      }
    });
  }

  static updatePasswordByEmail(email, newPassword, callback) {
    const userFilePath = path.join(rootDir, "data", "users.json");
    User.fetchAll((users) => {
      const updatedUsers = users.map((user) =>
        user.email === email ? { ...user, password: newPassword } : user,
      );

      fs.writeFile(userFilePath, JSON.stringify(updatedUsers), (err) => {
        if (err) {
          console.error(err);
        }

        if (callback) {
          callback();
        }
      });
    });
  }
};
