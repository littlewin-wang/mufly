var http = require('http')
var https = require('https')
var server = http.createServer()

server.on('request', function(req, res) {
  var request = https.request('https://api.spotify.com/v1' + req.url)
  request.on('response', function(response) {
    var c = ""
    response.setEncoding('utf8')
    response.on('data', function(chunk) {
      c += chunk
    })
    response.on('end', function() {
      response.headers['Access-Control-Allow-Origin'] = '*'
      res.writeHead(200, response.headers)
      res.write(c)
      res.end()
    })
  });
  request.on('error', function(err) {
    res.writeHead(200, {
      "Access-Control-Allow-Origin" : "*",
      "Content-Type": "application/json"
    })
    res.end({ "error": err })
  });
  request.end()
})

server.listen(7000, function() {
  console.log("listen on 7000")
})
