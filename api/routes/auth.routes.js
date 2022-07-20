const express = require("express");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user.model");
const authController = require("./../controllers/auth.controllers");

const router = express.Router();

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, done) {
      return done(null, jwtPayload);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL:
        "https://fbapi-backend.herokuapp.com/api/v1/auth/facebook/callback",
      profileFields: ["id", "first_name", "last_name", "email", "picture"],
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("token", accessToken);
      console.log("refreshtoken", refreshToken);
      console.log("profile", profile);
      User.findOne({ facebookId: profile.id }, function (err, user) {
        if (err) {
          console.log(err);
        }

        if (!err && user !== null) {
          done(null, user);
        } else {
          const user = new User({
            facebookId: profile.id,
            firstName: profile._json.first_name,
            lastName: profile._json.last_name,
            email: profile._json.email,
          });
          user.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log(err);
              done(null, user);
            }
          });
        }
      });
    }
  )
);

router.route("/").get(
  passport.authenticate("facebook", {
    scope: [
      "email",
      "pages_show_list",
      "pages_read_user_content",
      "pages_read_engagement",
      "pages_manage_posts",
      "pages_manage_engagement",
    ],
  })
);

router.route("/callback").get(authController.loginFacbook);

module.exports = router;
