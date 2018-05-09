const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const knex = require('../database/index.js');
const init = require('../server/initializeSession.js');
const { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CALLBACK_URL } = require('../config/keys.js');

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    scope: "https://www.googleapis.com/auth/plus.login",
  }, (accessToken, refreshToken, profile, cb) => {
    console.log('Profile in Google OAuth: ', profile);

    // knex('users')
    //   .where('username', profile.id)
    //   .then(user => {
    //     return done(null, user);
    //   })
    //   .catch(err => {
    //     return done(err, null);
    //   }); 
  }
));

// serialize user into the session:
init();

module.exports = passport;
