const express = require("express");
const userRoute = express.Router();

userRoute.get("/userDashboard", (req, res) => {
  res.render("./userPages/userDashboard");
});

exports.userRoute = userRoute;
