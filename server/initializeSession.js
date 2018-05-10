const passport = require('passport');
const knex = require('../database/index.js');

module.exports = function() {
  passport.serializeUser((user, done) => {
    console.log('serializing!!');
    console.log('user: ', user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log('deserializing!!');
    console.log('id: ', user);

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