const passport = require('passport');
const knex = require('../database/index.js');

module.exports = function() {
  passport.serializeUser((user, done) => {
    console.log('serializing!!');
    done(null, user.google_id);
  });

  passport.deserializeUser((google_id, done) => {
    console.log('deserializing!!');
    console.log('id: ', google_id);
    console.log('done: ', done);

    knex('users')
      .where('google_id', google_id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });
};