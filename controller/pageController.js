exports.rootPage = (req, res) => {
  res.render("./formPage/rootPage");
};

exports.getLogin = (req, res) => {
  res.render("./formPage/login");
};

exports.postLogin = (req, res) => {
  res.render("./formPage/login");
};

exports.getSignUp = (req, res) => {
  res.render("./formPage/SignUp");
};

exports.postSignUp = (req, res) => {
  res.redirect("./formPage/login");
};

exports.getFeedback = (req, res) => {
  res.render("./formPage/feedback");
};

exports.postFeedback = (req, res) => {
  res.render("./formPage/feedback");
};
