console.log("-");
var http = require('http');

var server = http.createServer(function (req, res) {
	res.writeHead(200);
	res.end('Hello Http');
});


var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "yourusername",
	password: "yourpassword"
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});
server.listen(18080);