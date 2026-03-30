const express = require("express");
const pageRoute = express.Router();

const {
  rootPage,
  getLogin,
  getSignUp,
} = require("../controller/pageController");
const { requireGuest } = require("../middleware/auth");

pageRoute.get("/", rootPage);

pageRoute.get("/login", requireGuest, getLogin);

pageRoute.get("/signup", requireGuest, getSignUp);


exports.pageRoute = pageRoute;
