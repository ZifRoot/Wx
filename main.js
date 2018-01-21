import { clearTimeout } from 'timers';

'use strict';
console.log("-");

const mysql = require('mysql');
var config = {};
const port = 18080;
config.host = 'localhost';
config.user = 'user1';
config.password = '123';
config.database = 'db1';

var connection = mysql.createConnection(config);
var express = require("express");
const app = express();

app.get('/h', function(req, res) {
	res.send('hello world');
});

/*Общий ожидатель */
var G_Eventer = { timer: null, ips: [], list: [] };

function timeout_init() {
	G_Eventer.timer = setTimeout(() => timeout__ev(), 5000);
}

function eventx(a) {
	var keys = Object.keys(obj);
	var A = G_Eventer.list;
	while (A.length > 0) {
		A.pop().fn(a);
	}
}

function timeout__ev() {
	G_Eventer.timer = null;
	eventx([]);
	timeout_init();
}

function Init_ev() {
	timeout_init();
}

function eventD(a) {
	if (G_Eventer.timer) clearTimeout(G_Eventer.timer);
	eventx(a);
	timeout_init();
}

function Up(ip, fn) {
	if (G_Eventer.ips[ip] === undefined) {
		//connect new ip		
		eventD([{ a: 1, ip: ip }]);
		G_Eventer.ips[ip] = { l: [] };
	}
	G_Eventer.ips[ip].dt = Date.now();
	G_Eventer.ips[ip].l[] = fn;
}

app.get('/ex', function(req, res) {
	var ip = IP(req);
	Up(ip, (a) => {
		res.end(' Hello Http ' + JSON.stringify(a) + Date.now());
	});
});

/*API */
app.get('/list', function(req, res) {
	connection.query('SELECT id,user,text from tb1', function(error, results, fields) {
		if (error) {
			throw error;
			return;
		}
		var x = JSON.stringify(results);
		res.send(x);
	});
});

var sql = "INSERT INTO tb1 SET ?";

function IP(req) {
	return req.connection.remoteAddress;
	var ip = req.headers['x-forwarded-for'].split(',').pop() ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
}
/*API */
app.post('/post', require('body-parser').urlencoded({ extended: false }), function(req, res) {
	if (!req.body || req.body.text === undefined) return res.sendStatus(400);

	const ip = IP(req);

	connection.query(sql, { user: ip, text: req.body.text }, function(err, result) {
		if (err) { res.send(err); throw err; }
		res.send("" + result.affectedRows, 200);
		eventD([{ a: 2, ip: ip }]);
	});
});

// app.use(require('compression'));
app.use(express.static('./public', {
	dotfiles: 'ignore',
	etag: true,
	extensions: ['htm', 'html'],
	immutable: true,
	maxAge: '1h',
	redirect: true,
	setHeaders: function(res, path, stat) {
		res.set('x-timestamp', Date.now())
	}
}));

app.use(function(req, res) {
	res.send('what???', 404);
});
console.log("listening");


app.listen(port);
