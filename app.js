//Core modules
const path = require("path");

//External module
const express = require("express");
const app = express();
const session = require("express-session");
const { attachCsrfToken } = require("./middleware/csrf");
require("dotenv").config();

//Local modules
const { pageRoute } = require("./routes/pageRoutes");
const { authRoute } = require("./routes/authRoute");
const { feedbackRoute } = require("./routes/feedbackRoute");

// Static files
app.use(express.static(path.join(__dirname, "public")));

//Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET || "dev-session-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 8, 
    },
  }),
);

app.use(attachCsrfToken);

app.use(pageRoute);
app.use(authRoute);
app.use(feedbackRoute);


app.use((req, res, next) => {
  res.status(404).render("404");
});

const connectDB = require("./config/db");
const PORT = process.env.PORT || 3005;

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
  });
});
