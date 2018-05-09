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
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('Profile in Google OAuth: ', profile);

    let existingUser = await knex('users').where('google_id', profile.id);
    existingUser = existingUser[0];

    if (existingUser) {
      console.log('existingUser: ', existingUser);
      done(null, existingUser);
    } else {
      let newUser = {
        google_id: profile.id,
        first_name: profile.name.givenName || null,
        last_name: profile.name.familyName || null,
      };

      let knexResult = await knex('users').insert(newUser);

      done(null, newUser);
    }
  }
));

// serialize user into the session:
init();

module.exports = passport;