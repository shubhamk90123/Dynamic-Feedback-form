const session = require("express-session");
require("dotenv").config();

module.exports = session({
  name: "sid",
  secret: process.env.SESSION_SECRET || "dev-session-secret-change-me",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 8, 
  },
});
