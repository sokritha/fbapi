const passport = require("passport");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      function (err, token) {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

const createSendToken = async (user, statusCode, res) => {
  const token = await signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // cookie cannot be accessed or modified through browser
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = ture; // create only in https

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.loginFacbook = (req, res, next) => {
  passport.authenticate("facebook", { session: false }, (err, user, info) => {
    console.log("user", user);
    console.log("info", info);
    if (err || !user) {
      return res.status(400).json({
        status: "fail",
        message: err,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.status(401).json({ status: "fail", message: err });
      }
      createSendToken(user, 200, res);
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(0),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};
