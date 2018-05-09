const passport = require('passport');
const knex = require('../database/index.js');

module.exports = function() {
  passport.serializeUser((user, done) => {
    console.log('serializing!!');
    console.log('google_id: ', user.google_id);
    console.log('done:' , done);
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