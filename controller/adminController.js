const Feedback = require("../models/feedback");

exports.adminDashboard = (req, res) => {
  Feedback.fetchAll((feedbackData) => {
    res.render("./adminPages/adminDashboard", {
      feedbackData: feedbackData,
    });
  });
};

exports.getAdminFeedback = (req, res) => {
  Feedback.fetchAll((feedbacks) => {
    console.log("All feedbacks:", feedbacks);
    res.render("./adminPages/adminFeedback");
  });
};

exports.postAdminFeedback = (req, res) => {
  const { feedback } = req.body;
  console.log("Feedback you entered", { feedback });

  const newFeedback = new Feedback(feedback);
  newFeedback.save();

  return res.redirect("/admin/adminDashboard");
};
