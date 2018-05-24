const ls = require('local-storage');
const knex = require('../database/index');

// not using as of now but leaving here in case we set up regular auth later
exports.postUser = (req, res) => {
  // UPDATE TO REQ.BODY.__________ for each line OR format req.body before sending
  let exampleUser = {
      first_name: 'Steve',
      last_name: 'Jones',
      username: 'steveJones',
      email: 'steveJones@aol.com',
      hashed_password: '123456',
  };

  knex('users').insert(exampleUser).then(result => {
      res.status(200).send(result);
  }).catch(err => {
      console.log('err: ', err);
      res.status(500).send(err);
  });
};

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