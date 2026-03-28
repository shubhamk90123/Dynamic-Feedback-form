const express = require("express");
const pageRoute = express.Router();

const {
  rootPage,
  getLogin,
  postLogin,
  getSignUp,
  postSignUp,
  getFeedback,
  postFeedback,
} = require("../controller/pageController");

pageRoute.get("/", rootPage);

pageRoute.get("/login", getLogin);

pageRoute.post("/login", postLogin);

pageRoute.get("/signup", getSignUp);

pageRoute.post("/signup", postSignUp);

pageRoute.get("/feedback", getFeedback);

pageRoute.post("/feedback", postFeedback);

exports.pageRoute = pageRoute;
