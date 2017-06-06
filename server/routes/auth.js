var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */

router.get('/', function(req, res, next) {
  const clientId      = '1236dff2784c468193edbcd94dcdb6e7'
  const clientSecret  = '5462f4a0fab24ff98a1c90cb1181449e'

  // We need, annoyingly, a base64-encoded string of our id:secret, for spotify.
  // We can use Buffers to do this for us.
  const authString = new Buffer(clientId+':'+clientSecret).toString('base64');

  request.post({
    url: 'https://accounts.spotify.com/api/token',
    json: true,
    body: 'grant_type=client_credentials',
    headers: {
      'Authorization':  `Basic ${authString}`,
      'Content-Type':   'application/x-www-form-urlencoded'
    }
  }, (err, ___, body) => {
    if ( err ) console.error('Oh no! Error getting bearer token', err);

    return res.send(body);
  });
});

module.exports = router;
