var express = require('express')
var config = require('./webpack.config');

var port = process.env.PORT || config.port

var app = express()

app.use(require('connect-history-api-fallback')())

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
})
