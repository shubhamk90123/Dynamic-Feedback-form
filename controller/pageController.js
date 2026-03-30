exports.rootPage = (req, res) => {
  res.render("./formPage/rootPage");
};

exports.getLogin = (req, res) => {
  res.render("./formPage/login", { errors: [], oldInput: {} });
};

exports.getSignUp = (req, res) => {
  res.render("./formPage/signUp", { errors: [], oldInput: {} });
};
