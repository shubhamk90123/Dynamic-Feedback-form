const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const { randomBytes } = require("crypto");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
const sessionSecret = process.env.SESSION_SECRET;
const mongoUri = process.env.MONGO_URI;

if (!sessionSecret && isProduction) {
  throw new Error("SESSION_SECRET is required in production.");
}

if (!sessionSecret && !isProduction) {
  console.warn("SESSION_SECRET is not set. Using ephemeral dev-only secret.");
}

if (!mongoUri && isProduction) {
  throw new Error("MONGO_URI is required in production for session storage.");
}

module.exports = session({
  name: "sid",
  secret: sessionSecret || randomBytes(32).toString("hex"),
  resave: false,
  saveUninitialized: false,
  ...(mongoUri
    ? {
        store: MongoStore.create({
          mongoUrl: mongoUri,
          ttl: 60 * 60 * 8,
          autoRemove: "native",
        }),
      }
    : {}),
  cookie: {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    maxAge: 1000 * 60 * 60 * 8,
  },
});
