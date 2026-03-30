const loginAttempts = new Map();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

exports.loginRateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || "unknown";
  const now = Date.now();
  const current = loginAttempts.get(ip);

  if (!current || now > current.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  if (current.count >= MAX_ATTEMPTS) {
    const email = (req.body.email || "").trim().toLowerCase();
    return res.status(429).render("./formPage/login", {
      errors: ["Too many login attempts. Please try again later."],
      oldInput: { email },
    });
  }

  current.count += 1;
  loginAttempts.set(ip, current);
  next();
};
