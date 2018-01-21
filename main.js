'use strict';
console.log("-");

const mysql = require('mysql');
var config = {};
config.host = 'localhost';
config.user = 'user1';
config.password = '123';
config.database = 'db1';

// connection.query('SELECT * from tb1', function(error, results, fields) {
// 	if (error) {}
// 	console.log('The solution is: ', results[0].solution);
// });
var connection = mysql.createConnection(config);
//connection.connect();

const fs = require('fs');

var fff = fs.readdirSync("./public");
var files = [fs.readFileSync("./public/index.html", { encoding: 'utf8' })];

//const http = require('http');
const url = require('url');

//var fileServer = new(require('node-static')).Server('./public', { cache: 3600, gzip: true, indexFile: "index.html" });

var express = require("express");
const app = express();

app.get('/h', function(req, res) {
	res.send('hello world');
});

app.get('/list', function(req, res) {
	connection.query('SELECT * from tb1', function(error, results, fields) {
		if (error) {
			throw error;
			return;
		}
		var x = JSON.stringify(results);
		res.send(x);
	});
	//	res.send('hello world');
});

var sql = "INSERT INTO tb1 SET ?";

function IP(req) {
	return req.connection.remoteAddress;
	var ip = req.headers['x-forwarded-for'].split(',').pop() ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
}

app.post('/post', require('body-parser').urlencoded({ extended: false }), function(req, res) {
	if (!req.body || req.body.text === undefined) return res.sendStatus(400);

	connection.query(sql, { user: IP(req), text: req.body.text }, function(err, result) {
		if (err) { res.send(err); throw err; }
		res.send("" + result.affectedRows, 200);
	});
});

//app.use(require('compression'));
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

//The 404 Route (ALWAYS Keep this as the last route)
app.use(function(req, res) {
	res.send('what???', 404);
});
console.log("listening");
app.listen(18080);
//connection.end();
return;

var server = http.createServer(function(req, res) {
	req.addListener('end', () => {
		var urlParse = url.parse(req.url);
		if (req.method == "POST") {
			var d = 0;
		} else if (urlParse.pathname == "/x") {
			res.writeHead(200);
			res.write("x " + Date.now());
			//		res.end(' Hello Http ' + Date.now());
			setTimeout(() => {

				res.end(' Hello Http ' + Date.now());
			}, 1000);
		} else {
			fileServer.serve(req, res);
		}

		// , function (e) {
		// if (e && (e.status === 404)) { // If the file wasn't found
		// 	fileServer.serveFile('./not-found.html', 404, {}, req, res);
		// }
		// });
	}).resume();
});


//connection.connect();
server.listen(18080);

//connection.end();
