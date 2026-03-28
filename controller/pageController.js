exports.rootPage = (req, res) => {
  res.render("./formPage/rootPage");
};

exports.getLogin = (req, res) => {
  res.render("./formPage/login");
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  console.log("Login body:", { email, password });
  res.render("./formPage/login");
};

exports.getSignUp = (req, res) => {
  res.render("./formPage/SignUp");
};

exports.postSignUp = (req, res) => {
  const { username, email, role, password, confirmPassword } = req.body;
  console.log("Signup body:", {
    username,
    email,
    role,
    password,
    confirmPassword,
  });
  res.redirect("/login");
};

exports.getFeedback = (req, res) => {
  res.render("./formPage/feedback");
};

exports.postFeedback = (req, res) => {
  res.render("./formPage/feedback");
};
