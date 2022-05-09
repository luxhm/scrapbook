const express = require('express'),
  router = express.Router();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const KEYS = require('../config/keys.json');
//keeping our secrets out of our main application is a security best practice
//we can add /config/keys.json to our .gitignore file so that we keep it local/private

let userProfile; //only used if you want to see user info beyond username

const User = require('../models/user_model');

router.use(session({
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000 //600 seconds of login time before being logged out
  },
  secret: KEYS["session-secret"]
}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: KEYS["google-client-id"],
    clientSecret: KEYS["google-client-secret"],
    //callbackURL: "http://scrapbooker.herokuapp.com/auth/google/callback"
    callbackURL: "/auth/google/callback"

    //todo: port==process.env.PORT? :
  },
  function(accessToken, refreshToken, profile, done) {
    userProfile = profile; //so we can see & use details form the profile
    return done(null, userProfile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*
  This triggers the communication with Google
*/
router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email']
  }));

/*
  This callback is invoked after Google decides on the login results
*/
router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/error?code=401'
  }),
  function(request, response) {
    console.log(userProfile);
    console.log("hey there");
    let userID = request.user._json.email;

    if (userID in User.getUser()){
      console.log("already logged in");
    }else{
      console.log("number 2");
      User.createUser(userID, userID.split('.')[0]);//only creates if not in users.json
    }

    response.redirect('/');
  });

router.get("/auth/logout", (request, response) => {
  request.logout();

  response.redirect('/');
});

module.exports = router;
