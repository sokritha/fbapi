const express = require("express");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const FacebookStrategy = require("passport-facebook").Strategy;
const authController = require("../controllers/auth.controllers");
const User = require("../models/user.model");

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
      try {
        const user = await User.findOneOrCreate(
          { id: profile },
          {
            email: profile._json.email || "",
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            facebookId: profile.id,
            phone: profile._json_phone || "",
          }
        );

        return done(null, user);
      } catch (err) {
        return done(null, null, err);
      }
    }
  )
);

router
  .route("/")
  .get(passport.authenticate("facebook", { scope: ["email", "manage_pages"] }));

router.route("/callback").get(authController.loginFacbook);

module.exports = router;
