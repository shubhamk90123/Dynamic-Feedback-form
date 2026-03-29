//Core modules
const fs = require("fs");
const path = require("path");

//Local modules
const rootDir = require("../utils/path");

//fake database for users
let userData = [];

module.exports = class User {
  constructor(username, email, role, password) {
    this.username = username;
    this.email = email;
    this.role = role;
    this.password = password;
  }

  save() {
    userData.push(this);
    const userFilePath = path.join(rootDir, "data", "users.json");
    fs.writeFile(userFilePath, JSON.stringify(userData), (err) => {
      console.log(err);
    });
  }

  static fetchAll() {
    return userData;
  }
};
