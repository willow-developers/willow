const ls = require('local-storage');
const knex = require('../database/index');

exports.postUser = (req, res) => {

  // UPDATE TO REQ.BODY.__________ for each line OR format req.body before sending
  let userData = {
      first_name: 'Steve',
      last_name: 'Jones',
      username: 'steveJones',
      email: 'steveJones@aol.com',
      hashed_password: '123456',
  };

  knex('users').insert(userData).then(result => {
      console.log('result: ', result);
      res.status(200).send(result);
  }).catch(err => {
      console.log('err: ', err);
      res.status(500).send(err);
  });
};

exports.currentUser = (req, res) => {
  const checkUser = ls('user');
  if (checkUser === null) {
      res.send('');
  } else {
      res.send({ user: 1 });
  }
};

exports.login = (req, res) => {
  ls('user', 1)
  res.send({ user: 1 });
};

exports.signup = (req, res) => {
  ls('user', 1)
  res.send({ user: 1 });
};

exports.logout = (req, res) => {
  ls.remove('user');
  res.send('');
};