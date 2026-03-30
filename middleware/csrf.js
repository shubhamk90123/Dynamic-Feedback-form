const { randomBytes, timingSafeEqual } = require("crypto");

exports.attachCsrfToken = (req, res, next) => {
  if (!req.session) {
    return next();
  }

  if (!req.session.csrfToken) {
    req.session.csrfToken = randomBytes(24).toString("hex");
  }

  res.locals.csrfToken = req.session.csrfToken;
  next();
};

exports.verifyCsrf = (req, res, next) => {
  const sessionToken = req.session && req.session.csrfToken;
  const formToken = req.body && req.body._csrf;

  if (!sessionToken || !formToken) {
    return res.status(403).render("404");
  }

  const sessionBuffer = Buffer.from(sessionToken);
  const formBuffer = Buffer.from(formToken);

  if (
    sessionBuffer.length !== formBuffer.length ||
    !timingSafeEqual(sessionBuffer, formBuffer)
  ) {
    return res.status(403).render("404");
  }

  next();
};
