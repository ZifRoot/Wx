'use strict';
const port = 18080;
const config = {
	host: 'localhost',
	user: 'user1',
	password: '123',
	database: 'db1'
};
const TimeoutLen = 1000;

console.log("-");

const mysql = require('mysql');
const express = require("express");

const connection = mysql.createConnection(config);
const app = express();

app.get('/h', function(req, res) {
	res.send('hello world');
});

/*Общий ожидатель */
var G_Eventer = { timer: null, ips: [] };

function timeout_init() {
	G_Eventer.timer = G_Eventer.timer || setTimeout(() => timeout__ev(), TimeoutLen);
}

function ipst() {
	return Object.keys(G_Eventer.ips).map((a) => { return { ip: a, num: G_Eventer.ips[a].l.length } });
}

function eventx(a) {
	const now = Date.now() - TimeoutLen * 2;
	var ips = Object.keys(G_Eventer.ips);
	for (let i = 0; i < ips.length; i++) {
		const ip = ips[i];
		const x = G_Eventer.ips[ip];
		if (x.l.length === 0 && x.dt < now) {
			delete G_Eventer.ips[ip];
			a.push({ a: 3, ip: ip });
		}
	}
	console.log(JSON.stringify(a));
	ips = Object.keys(G_Eventer.ips);
	for (let i = 0; i < ips.length; i++) {
		const A = G_Eventer.ips[ips[i]].l;
		while (A.length > 0) {
			A.pop()(a);
		}
	}
	return ips.length > 0;
}

function timeout__ev() {
	G_Eventer.timer = null;
	if (eventx([]))
		timeout_init();
}

function Init_ev() {
	timeout_init();
}

function eventD(a) {
	if (G_Eventer.timer) clearTimeout(G_Eventer.timer);
	if (eventx(a))
		timeout_init();
}

function Up(ip, fn) {
	if (G_Eventer.ips[ip] === undefined) {
		//connect new ip		
		eventD([{ a: 1, ip: ip }]);
		timeout_init();
		G_Eventer.ips[ip] = { l: [] };
	}
	G_Eventer.ips[ip].dt = Date.now();
	G_Eventer.ips[ip].l.push(fn);
}

app.get('/ex', function(req, res) {
	const ip = IP(req);
	Up(ip, (a) => res.send(JSON.stringify(a)));
});

/*API */
app.get('/list', function(req, res) {
	connection.query('SELECT id,user,text from tb1', function(error, results, fields) {
		if (error) {
			throw error;
			return;
		}
		const x = JSON.stringify(results);
		res.end(x);
	});
});

app.get('/listx', function(req, res) {
	res.send(JSON.stringify(ipst()));
});

const sql = "INSERT INTO tb1 SET ?";

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
		res.send("" + result.affectedRows);
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
