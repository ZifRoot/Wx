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

const fs = require('fs');

var fff = fs.readdirSync("./public");
var files = [fs.readFileSync("./public/index.html", { encoding: 'utf8' })];

const http = require('http');
const url = require('url');
//const myURL =
var static = require('node-static');

var fileServer = new static.Server('./public', { cache: 3600, gzip: true, indexFile: "index.html" });


var server = http.createServer(function(req, res) {
	req.addListener('end', function() {
		fileServer.serve(req, res)
			// , function (e) {
			// if (e && (e.status === 404)) { // If the file wasn't found
			// 	fileServer.serveFile('./not-found.html', 404, {}, req, res);
			// }
			// });
	}).resume();

	// if (req.method == "GET") {
	// 	var x = url.parse(req.url);
	// 	x.pathname.replace(/[^]/, "");
	// }
	// res.writeHead(200);
	// res.end('Hello Http ' + Date.now());
});

//var connection = mysql.createConnection(config);
//connection.connect();
server.listen(18080);

//connection.end();
