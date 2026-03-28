const express = require("express");
const {
  userDashboard,
  getUserFeedback,
  postUserFeedback,
} = require("../controller/userController");

const userRoute = express.Router();

userRoute.get("/userDashboard", userDashboard);

userRoute.get("/userFeedback", getUserFeedback);

userRoute.post("/userFeedback", postUserFeedback);

exports.userRoute = userRoute;
