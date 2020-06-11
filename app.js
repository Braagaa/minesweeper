const express = require('express');
const favicon = require('serve-favicon');
const {join} = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.static(join(__dirname, 'public')));
app.use(favicon(join(__dirname, 'public', 'favicon.ico')));

app.get('/', (req, res) => {
	res.status(200)
		.sendFile(join(__dirname, 'public', 'index.html'));
});

app.use('/', (req, res) => res.redirect('/'));

app.listen(app.get('port'));
