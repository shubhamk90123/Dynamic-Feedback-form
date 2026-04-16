const Feedback = require("../models/feedback");

const canManageFeedback = (user, item) => {
  if (!user || !item) return false;
  if (user.role === "admin") return true;
  return item.submittedBy && item.submittedBy.email === user.email;
};

exports.getUserDashboard = (req, res) => {
  const loggedInUser = req.session.user;
  const isAdmin = loggedInUser.role === "admin";
  const dashboardTitle = isAdmin
    ? "Admin Feedback Dashboard"
    : "User Feedback Dashboard";
  const loggedInText = `${loggedInUser.username} logged in (${loggedInUser.role})`;

  Feedback.find()
    .then((feedbackData) => {
      const visibleFeedback = isAdmin
        ? feedbackData
        : feedbackData.filter(
            (item) =>
              item.submittedBy && item.submittedBy.email === loggedInUser.email,
          );

      const feedbackWithPermission = visibleFeedback.map((item) => {
        const itemObj = item.toObject
          ? item.toObject({ virtuals: true })
          : item;
        return {
          ...itemObj,
          canManage: canManageFeedback(loggedInUser, itemObj),
        };
      });

      res.render("./userPages/dashboard", {
        feedbackData: feedbackWithPermission,
        dashboardTitle,
        loggedInText,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
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

  newFeedback
    .save()
    .then(() => res.redirect("/dashboard"))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

exports.getEditFeedbackPage = (req, res) => {
  const feedbackId = req.params.id;

  Feedback.findById(feedbackId)
    .then((item) => {
      if (!item) return res.redirect("/dashboard");
      if (!canManageFeedback(req.session.user, item))
        return res.status(403).render("404");

      return res.render("./userPages/editFeedback", {
        errors: [],
        feedbackItem: item.toObject ? item.toObject({ virtuals: true }) : item,
      });
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/dashboard");
    });
};

exports.postEditFeedbackPage = (req, res) => {
  const feedbackId = req.params.id;
  const updatedText = (req.body.feedback || "").trim();

  Feedback.findById(feedbackId)
    .then((item) => {
      if (!item) return res.redirect("/dashboard");
      if (!canManageFeedback(req.session.user, item))
        return res.status(403).render("404");

      if (updatedText.length < 3) {
        return res.status(400).render("./userPages/editFeedback", {
          errors: ["Feedback must be at least 3 characters."],
          feedbackItem: item.toObject
            ? item.toObject({ virtuals: true })
            : item,
        });
      }

      item.feedback = updatedText;
      return item.save().then(() => res.redirect("/dashboard"));
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/dashboard");
    });
};

exports.postDeleteFeedbackPage = (req, res) => {
  const feedbackId = req.params.id;

  Feedback.findById(feedbackId)
    .then((item) => {
      if (!item) return res.redirect("/dashboard");
      if (!canManageFeedback(req.session.user, item))
        return res.status(403).render("404");

      return Feedback.findByIdAndDelete(feedbackId).then(() =>
        res.redirect("/dashboard"),
      );
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/dashboard");
    });
};
