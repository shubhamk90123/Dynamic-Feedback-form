exports.userDashboard = (req, res) => {
  res.render("./userPages/userDashboard");
};

exports.getUserFeedback = (req, res) => {
  res.render("./userPages/userFeedback");
};

exports.postUserFeedback = (req, res) => {
  const { feedback } = req.body;
  console.log("Feedback you entered", { feedback });
  return res.redirect("/user/userDashboard");
};
