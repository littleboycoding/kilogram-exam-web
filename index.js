var http = require("http");
var fs = require("fs");

http
  .createServer(function(req, res) {
    fs.readFile("." + req.url, function(err, data) {
      if (!err) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
      } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("404 File not found");
      }
      res.end();
    });
  })
  .listen(8080);
