console.log("-");
var http = require('http');

var server = http.createServer(function (req, res) {
	res.writeHead(200);
	res.end('Hello Http');
});

var mysql = require('mysql');

var client = mysql.createClient();
client.host = '127.0.0.1';
client.port = '3306';
client.user = 'someuser';
client.password = 'userpass';
client.database = 'node';

client.query('SELECT * FROM users', function (error, result, fields) {
	console.log(result);
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});
server.listen(18080);