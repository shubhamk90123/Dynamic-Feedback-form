const express = require("express");
const { adminDashboard } = require("../controller/adminController");
const adminRoute = express.Router();

adminRoute.get("/adminDashboard", adminDashboard);

exports.adminRoute = adminRoute;
