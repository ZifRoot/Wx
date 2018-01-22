console.log("bmmjb");

const Sequelize = require("sequelize");

const sequelize = new Sequelize('db1', 'user1', '123', { host: 'localhost', dialect: 'mysql' });

const Record = sequelize.define('Record', {
	user: Sequelize.STRING,
	text: Sequelize.TEXT
});
Record.findAll().then(a => a.)
sequelize.sync()
	.then(() => Record.create({
		user: 'janedoe',
		text: "chvjbklgbfnghb"
	}))
	.then(jane => {
		console.log(jane.toJSON());
	});

console.log("_____");
return;
//NodeJS.Timer
setTimeout(() => console.log("1"), 1000);
const fs = require('fs');

var fff = fs.readdirSync("./public");
var files = [fs.readFileSync("./public/index.html", { encoding: 'utf8' })];

//const http = require('http');
const url = require('url');

//connection.connect();



//var fileServer = new(require('node-static')).Server('./public', { cache: 3600, gzip: true, indexFile: "index.html" });
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


function newFunction() {
	const pg = require('pg');
	const connectionString = 'postgres://192.168.0.101:5432/todo';
	const client = new pg.Client({
		host: '192.168.0.101',
		user: "user1",
		password: "123",
		database: "db1"
	});
	client.connect();
	client.query('select 1 as f').then((k) => console.log(JSON.stringify(k)));
	console.log("_____");
}
//connection.end();
