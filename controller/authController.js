const Users = require("../models/user");
const { hashPassword, verifyPassword, needsRehash } = require("../utils/password");

const isEmail = (v = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

exports.postLogin = (req, res) => {
  const email = (req.body.email || "").toLowerCase();
  const password = (req.body.password || "");

  const errors = [];
  if (!email) errors.push("Email is required.");  
  if (!password) errors.push("Password is required.");

  if (errors.length) {
    return res.status(400).render("./formPage/login", {
      errors,
      oldInput: { email },
    });
  }
   
  Users.findOne({ email }).then((matchedUser) => {
    if (!matchedUser) {
      return res.status(401).render("./formPage/login", {
        errors: ["Invalid email or password."],
        oldInput: { email },
      });
    }

    const isValidPassword = verifyPassword(password, matchedUser.password);
    if (!isValidPassword) {
      return res.status(401).render("./formPage/login", {
        errors: ["Invalid email or password."],
        oldInput: { email },
      });
    }

    const completeLogin = () => {
      req.session.user = {
        username: matchedUser.username,
        email: matchedUser.email,
        role: matchedUser.role,
      };

      return res.redirect("/dashboard");
    };

    if (needsRehash(matchedUser.password)) {
      const upgradedPassword = hashPassword(password);
      matchedUser.password = upgradedPassword;
      return matchedUser.save().then(() => completeLogin());
    }

    return completeLogin();
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
  });
};

exports.postSignUp = (req, res) => {
  const username = (req.body.username || "").trim();
  const email = (req.body.email || "").trim().toLowerCase();
  const role = (req.body.role || "").trim();
  const password = (req.body.password || "").trim();
  const confirmPassword = (req.body.confirmPassword || "").trim();

  const errors = [];
  if (!username) errors.push("Username is required.");
  if (!isEmail(email)) errors.push("Enter a valid email.");
  if (!["admin", "user"].includes(role)) errors.push("Choose a valid role.");
  if (password.length < 6)
    errors.push("Password must be at least 6 characters.");
  if (password !== confirmPassword) errors.push("Passwords do not match.");

  if (errors.length) {
    return res.status(400).render("./formPage/signUp", {
      errors,
      oldInput: { username, email, role },
    });
  }

  Users.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409).render("./formPage/signUp", {
          errors: ["Email is already registered."],
          oldInput: { username, email, role },
        });
      }

      const passwordHash = hashPassword(password);
      const newUser = new Users({
        username,
        email,
        role,
        password: passwordHash,
      });

      return newUser.save().then(() => res.redirect("/login"));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("sid");
    return res.redirect("/login");
  });
};
