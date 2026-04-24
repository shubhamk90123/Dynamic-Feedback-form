const Users = require("../models/user");

const clearSessionAndContinue = (req, next) => {
  if (!req.session) return next();
  req.session.destroy(() => next());
};

exports.requireAuth = async (req, res, next) => {
  if (!req.session || !req.session.user || !req.session.user.email) {
    return res.redirect("/login");
  }

  try {
    const existingUser = await Users.findOne(
      { email: req.session.user.email },
      "username email role",
    ).lean();
    if (!existingUser) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    // Keep session role/username aligned with latest DB state.
    req.session.user = {
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
    };

    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

exports.requireGuest = async (req, res, next) => {
  if (!req.session || !req.session.user || !req.session.user.email) {
    return next();
  }

  try {
    const existingUser = await Users.findOne(
      { email: req.session.user.email },
      "_id",
    ).lean();
    if (!existingUser) {
      return clearSessionAndContinue(req, next);
    }
    return res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
