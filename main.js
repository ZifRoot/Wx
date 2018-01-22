'use strict';
const port = 18080;
const config = {
	host: 'localhost',
	user: 'user1',
	password: '123',
	database: 'db1',
	dialect: 'mysql'
};

console.log("-");

const geventer = require("eventer");
const Sequelize = require("sequelize");
const express = require("express");
const bodyParser = require('body-parser');
const compression = require('compression');

var g_event = new geventer();
const sequelize = new Sequelize(config.database, config.user, config.password, { host: config.host, dialect: config.dialect });
const Record = sequelize.define('Record', {
	user: Sequelize.STRING,
	text: Sequelize.TEXT
});

sequelize.sync();
const app = express();
/* Waiter */
app
	.get('/waiter', (req, res) => g_event.Connect(IP(req), (a) => res.send(JSON.stringify(a))));

/*APIs */
app
	.get('/list', (req, res) => Record.findAll().then(a => res.end(JSON.stringify(a))))
	.get('/list_login', (req, res) => res.send(JSON.stringify(g_event.list_login())))
	.post('/post', bodyParser.urlencoded({ extended: false }),
		function(req, res) {
			if (!req.body || req.body.text === undefined) return res.sendStatus(400);
			const ip = IP(req);
			Record.create({
				user: ip,
				text: req.body.text,
			}).then(result => {
				g_event.eventD([{ Action: 2, Login: ip }]);
				res.send("");
			}).catch(error => {
				console.log(error);
				res.status(400);
			});
		});

/* Defaults */
app
	.use(compression({}))
	.use(express.static('./public', {
		dotfiles: 'ignore',
		etag: true,
		extensions: ['htm', 'html'],
		immutable: true,
		maxAge: '1h',
		redirect: true,
		setHeaders: (res, path, stat) => res.set('x-timestamp', Date.now())
	}))
	.use((req, res) => res.status(404).send('what???'))
	.listen(port);
console.log("listening");

function IP(req) {
	var h = req.headers['x-forwarded-for'];
	return (h ? h.split(',').pop() : null) ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
}
