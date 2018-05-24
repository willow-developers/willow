const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// google OAuth and express session:
const cookieSession = require('cookie-session');
const passport = require('passport');
const db = require('../database/index');

const { COOKIE_SESSION_SECRET } = require('../config/keys');
const routes = require('../routes/index');
const app = express();

app.use(bodyParser.json());

// google OAuth and CookieSession
app.use(cookieSession({
	maxAge: 1000 * 60 * 60 * 24,
	keys: [COOKIE_SESSION_SECRET],
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
	// making sure that express will serve up production
	// assets like our main.js file, or main.css file!
	app.use(express.static('client/build'));
	// Express will serve up the index.html file if it
	// doesn't recognize the route
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`listening on ${PORT}!!`)});