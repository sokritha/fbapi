const express = require("express");
const passport = require("passport");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");

const app = express();

// Global Middleware
app.use(cors());
// Body parser ()
// (convert the body from post request to json[express.json()] + html post form to json[express.urlencoded()])
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(passport.initialize());

// Routes
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/api/v1/auth/facebook", authRouter);

app.use("/api/v1/users", userRouter);
app.use("/", (req, res) => {
  res.send("This is homepage");
});

module.exports = app;
