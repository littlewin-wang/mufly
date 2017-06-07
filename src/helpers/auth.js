const axios = require('axios')
axios.default.withCredentials = true

const AUTH_ROOT = 'http://119.29.68.183:7788/'

export default {
  getAuth () {
    let instance = axios.create({
      baseURL: AUTH_ROOT
    })
    instance.defaults.headers.common = {
      'Accept': 'application/json, text/plain, */*'
    }
    return instance.get('auth')
  }
}
