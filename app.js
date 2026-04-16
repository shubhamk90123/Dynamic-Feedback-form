//Core modules
const path = require("path");

//External module
const express = require("express");
const app = express();
const helmet = require("helmet");
const { attachCsrfToken } = require("./middleware/csrf");
require("dotenv").config();

//Local modules
const { pageRoute } = require("./routes/pageRoutes");
const { authRoute } = require("./routes/authRoute");
const { feedbackRoute } = require("./routes/feedbackRoute");
const sessionConfig = require("./config/session");
const { globalLimiter, authLimiter } = require("./middleware/rateLimiter");
const { notFoundHandler } = require("./middleware/errorHandler");

app.use(helmet());

app.use(globalLimiter);
app.use("/login", authLimiter);
app.use("/signup", authLimiter);

// Static files
app.use(express.static(path.join(__dirname, "public")));

//Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(sessionConfig);

app.use(attachCsrfToken);

app.use(pageRoute);
app.use(authRoute);
app.use(feedbackRoute);


app.use(notFoundHandler);

const connectDB = require("./config/db");
const PORT = process.env.PORT || 3005;

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
  });
});
