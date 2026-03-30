const Feedback = require("../models/feedback");

const canManageFeedback = (user, item) => {
  if (!user || !item) return false;
  if (user.role === "admin") return true;
  return item.submittedBy && item.submittedBy.email === user.email;
};

exports.getUserDashboard = (req, res) => {
  const loggedInUser = req.session.user;
  const dashboardTitle =
    loggedInUser.role === "admin"
      ? "Admin Feedback Dashboard"
      : "User Feedback Dashboard";
  const loggedInText = `${loggedInUser.username} logged in (${loggedInUser.role})`;

  Feedback.fetchAll((feedbackData) => {
    const feedbackWithPermission = feedbackData.map((item) => ({
      ...item,
      canManage: canManageFeedback(loggedInUser, item),
    }));

    res.render("./userPages/dashboard", {
      feedbackData: feedbackWithPermission,
      dashboardTitle,
      loggedInText,
    });
  });
};

exports.getAddFeedbackPage = (req, res) => {
  res.render("./userPages/form", { errors: [], oldInput: {} });
};

exports.postAddFeedbackPage = (req, res) => {
  const feedback = (req.body.feedback || "").trim();
  const user = req.session.user;

  if (feedback.length < 3) {
    return res.status(400).render("./userPages/form", {
      errors: ["Feedback must be at least 3 characters."],
      oldInput: { feedback },
    });
  }

  const newFeedback = new Feedback({
    feedback,
    submittedBy: {
      username: user.username,
      role: user.role,
      email: user.email,
    },
  });

  newFeedback.save(() => res.redirect("/dashboard"));
};

exports.getEditFeedbackPage = (req, res) => {
  const feedbackId = req.params.id;

  Feedback.findById(feedbackId, (item) => {
    if (!item) return res.redirect("/dashboard");
    if (!canManageFeedback(req.session.user, item))
      return res.status(403).render("404");

    return res.render("./userPages/editFeedback", {
      errors: [],
      feedbackItem: item,
    });
  });
};

exports.postEditFeedbackPage = (req, res) => {
  const feedbackId = req.params.id;
  const updatedText = (req.body.feedback || "").trim();

  Feedback.findById(feedbackId, (item) => {
    if (!item) return res.redirect("/dashboard");
    if (!canManageFeedback(req.session.user, item))
      return res.status(403).render("404");

    if (updatedText.length < 3) {
      return res.status(400).render("./userPages/editFeedback", {
        errors: ["Feedback must be at least 3 characters."],
        feedbackItem: item,
      });
    }

    Feedback.updateById(feedbackId, updatedText, () => res.redirect("/dashboard"));
  });
};

exports.postDeleteFeedbackPage = (req, res) => {
  const feedbackId = req.params.id;

  Feedback.findById(feedbackId, (item) => {
    if (!item) return res.redirect("/dashboard");
    if (!canManageFeedback(req.session.user, item))
      return res.status(403).render("404");

    Feedback.deleteById(feedbackId, () => res.redirect("/dashboard"));
  });
};
