//Core modules
const path = require("path");

//External module
const express = require("express");
const app = express();

const rootDir = require("./utils/path");

//Local modules
const { pageRoute } = require("./routes/pageRoutes");
const { adminRoute } = require("./routes/AdminRoute");
const { userRoute } = require("./routes/UserRoute");

// Static files
app.use(express.static(path.join(rootDir, "public")));

//Body Parser
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.set("view engine", "ejs");
app.set("views", "views");

app.use(pageRoute);
app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.use((req, res, next) => {
  res.status(404).render("404");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`app lis listening to port  http://localhost:${PORT}`);
});
