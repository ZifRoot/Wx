console.log("-");

var mysql = require('mysql');
var config = {};
config.host = 'localhost';
config.user = 'user1';
config.password = '123';
config.database = 'db1';

var connection = mysql.createConnection(config);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
	if (error) {}
	console.log('The solution is: ', results[0].solution);
});

connection.end();

var http = require('http');

var server = http.createServer(function (req, res) {
	res.writeHead(200);
	res.end('Hello Http');
});
//server.listen(18080);