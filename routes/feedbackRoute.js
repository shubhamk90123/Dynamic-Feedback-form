const express = require("express");
const {
  getUserDashboard,
  getAddFeedbackPage,
  postAddFeedbackPage,
  getEditFeedbackPage,
  postEditFeedbackPage,
  postDeleteFeedbackPage,
} = require("../controller/feedbackController");
const { requireAuth } = require("../middleware/auth");
const { verifyCsrf } = require("../middleware/csrf");

const feedbackRoute = express.Router();

feedbackRoute.get("/dashboard", requireAuth, getUserDashboard);

feedbackRoute.get("/addFeedback", requireAuth, getAddFeedbackPage);

feedbackRoute.post("/addFeedback", requireAuth, verifyCsrf, postAddFeedbackPage);
feedbackRoute.get("/feedback/edit/:id", requireAuth, getEditFeedbackPage);
feedbackRoute.post(
  "/feedback/edit/:id",
  requireAuth,
  verifyCsrf,
  postEditFeedbackPage,
);
feedbackRoute.post(
  "/feedback/delete/:id",
  requireAuth,
  verifyCsrf,
  postDeleteFeedbackPage,
);

exports.feedbackRoute = feedbackRoute;
