const ls = require('local-storage');
const knex = require('../database/index');

// UPDATE:
exports.logoutUser = (req, res) => {
  req.logout();
  res.status(200).send();
};

exports.getUserData = (req, res) => {
  res.status(200).send(req.user);
};

exports.googleRedirect = (req, res) => {
  console.log(`google authentication successful!!`);
  res.redirect('/dashboard');
};