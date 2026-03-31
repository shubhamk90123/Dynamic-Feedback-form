exports.requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  next();
};

exports.requireGuest = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect("/dashboard");
  }

  next();
};
