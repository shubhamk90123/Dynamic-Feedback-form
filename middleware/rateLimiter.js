const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 150, 
  message: "Too many requests from this IP, please try again after 15 minutes."
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many authentication attempts from this IP, please try again later."
});

module.exports = {
  globalLimiter,
  authLimiter
};
