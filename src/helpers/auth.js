const axios = require('axios')

const AUTH_ROOT = 'http://localhost:3000/auth'
axios.default.withCredentials = true

// export API interface
export default {
  getAuth () {
    return axios.get(AUTH_ROOT)
  }
}
