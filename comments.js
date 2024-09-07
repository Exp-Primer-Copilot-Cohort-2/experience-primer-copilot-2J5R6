//Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var comments = [];
var server = http.createServer(function(req, res) {
  var parsedUrl = url.parse(req.url, true);
  var pathName = parsedUrl.pathname;
  if (pathName === '/') {
    fs.readFile('./index.html', function(err, data) {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/html'
        });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.end(data);
      }
    });
  } else if (pathName === '/comments') {
    if (req.method === 'GET') {
      var commentsStr = JSON.stringify(comments);
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(commentsStr);
    } else if (req.method === 'POST') {
      var comment = parsedUrl.query;
      comments.push(comment);
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
      });
      res.end('succeed');
    } else if (req.method === 'OPTIONS') {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      res.end();
    }
  } else {
    var filePath = path.join(__dirname, pathName);
    fs.readFile(filePath, function(err, data) {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/html'
        });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.end(data);
      }
    });
  }
});

server.listen(8080, function() {
  console.log('Server is listening on port 8080');
});