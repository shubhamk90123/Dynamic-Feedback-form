const Feedback = require("../models/feedback");


exports.userDashboard = (req, res) => {
  Feedback.fetchAll((feedbackData) => {
    res.render("./userPages/userDashboard", {
      feedbackData: feedbackData,
    });
  });
};

exports.getUserFeedback = (req, res) => {
  res.render("./userPages/userFeedback");
};

exports.postUserFeedback = (req, res) => {
  const { feedback } = req.body;
  console.log("Feedback you entered", { feedback });

  const newFeedback = new Feedback(feedback);
  newFeedback.save();
  return res.redirect("/user/userDashboard");
};
