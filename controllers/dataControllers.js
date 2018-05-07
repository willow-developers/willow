const fs = require('fs');
const path = require('path');
const ls = require('local-storage');

exports.test = (req, res) => {
  const dataPath = path.join(path.dirname(__dirname),'/dummy_data/graph_data.json');
  fs.readFile(dataPath, (err, data) => {
    if (err) console.error(err);
    res.send(JSON.parse(data));
  })
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