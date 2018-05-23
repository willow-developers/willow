const passport = require('passport');
const knex = require('../database/index.js');

module.exports = function() {
  passport.serializeUser((user, done) => {
    console.log('serializing user: ', { google_id: user.google_id, name: user.first_name });
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log('deserializing user: ', { google_id: user.google_id, name: user.first_name });
    knex('users')
      .where('google_id', user.google_id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });
};