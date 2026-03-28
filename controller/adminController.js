exports.adminDashboard = (req, res) => {
  res.render("./adminPages/adminDashboard");
};

exports.getAdminFeedback = (req, res) => {
  res.render("./adminPages/adminFeedback");
};

exports.postAdminFeedback = (req, res) => {
  const { feedback } = req.body;
  console.log("Feedback you entered", { feedback });
  return res.redirect("/admin/adminDashboard");
};
