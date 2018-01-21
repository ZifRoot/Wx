console.log("bmmjb");
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

//connection.end();
