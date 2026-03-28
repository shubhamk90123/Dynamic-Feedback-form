const fs = require("fs/promises");
const path = require("path");

let userData = [];

exports.rootPage = (req, res) => {
  res.render("./formPage/rootPage");
};

exports.getLogin = (req, res) => {
  res.render("./formPage/login");
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  console.log("Login body:", { email, password });
  res.render("./formPage/login");
};

exports.getSignUp = (req, res) => {
  res.render("./formPage/signUp");
};

exports.postSignUp = (req, res) => {
  const { username, email, role, password, confirmPassword } = req.body;

  if (!username || !email || !password || !role || !confirmPassword) {
    return res.status(400).render("signup");
  }

  if (password !== confirmPassword) {
    return res.status(400).render("signup");
  }

  userData.push({
    username: username.trim(),
    email: email.toLowerCase().trim(),
    role: role.trim(),
    password: password.trim(),
  });

  console.log("Signup body:", {
    username,
    email,
    role,
    password,
    confirmPassword,
  });
  return res.redirect("/login");
};
