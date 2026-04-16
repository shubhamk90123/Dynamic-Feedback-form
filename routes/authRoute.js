const express = require("express");
const {
  postLogin,
  postSignUp,
  postLogout,
} = require("../controller/authController");
const { requireAuth, requireGuest } = require("../middleware/auth");
const { verifyCsrf } = require("../middleware/csrf");

const authRoute = express.Router();

authRoute.post("/login", requireGuest, verifyCsrf, postLogin);

authRoute.post("/signup", requireGuest, verifyCsrf, postSignUp);

authRoute.post("/logout", requireAuth, verifyCsrf, postLogout);

exports.authRoute = authRoute;
