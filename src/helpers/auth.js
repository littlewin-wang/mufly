const request = require('request')

const AUTH_ROOT = 'https://accounts.spotify.com/api/token'
const CLIENT_ID = '1236dff2784c468193edbcd94dcdb6e7'
const CLIENT_Secret = '5462f4a0fab24ff98a1c90cb1181449e'
const authKey = new Buffer(CLIENT_ID + ':' + CLIENT_Secret).toString('base64')

const options = {
  url: AUTH_ROOT,
  json: true,
  body: 'grant_type=client_credentials',
  headers: {
    'Authorization':  `Basic ${authKey}`,
    'Content-Type':   'application/x-www-form-urlencoded'
  }
}

request.post(options, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body)
  console.log(typeof body)
})
