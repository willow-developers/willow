const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const keys = require('./config/keys');
const routes = require('./routes/index');
const app = express();
app.use(bodyParser.json());

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
app.listen(PORT);