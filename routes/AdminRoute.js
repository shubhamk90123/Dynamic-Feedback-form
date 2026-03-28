const express = require("express");
const { adminDashboard, getAdminFeedback, postAdminFeedback } = require("../controller/adminController");

const adminRoute = express.Router();

adminRoute.get("/adminDashboard", adminDashboard);

adminRoute.get("/adminFeedback", getAdminFeedback)

adminRoute.post("/adminFeedback", postAdminFeedback);

exports.adminRoute = adminRoute;
