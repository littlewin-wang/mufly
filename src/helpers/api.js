const axios = require('axios')
import AUTH from './auth'

axios.default.withCredentials = true

const API_ROOT = 'https://api.spotify.com/v1/'
let isGetting  = false

/**
 * Return auto token for Spotify Authorization after formatting
 * @param {Object} token - The json token object request from Spotify
 * @return {String} The formatting token string or null
 */
const formatToken = ((token) => {
  if (token.token_type && token.access_token) {
    return token.token_type + ' ' + token.access_token
  } else {
    return null
  }
})

/**
 * Get the token from proxy server if need
 * And store the auth in localStorage
 */
const getAndStoreToken = (() => {
  const authToken = JSON.parse(localStorage.getItem('AuthToken'))

  // If there is one and it is valid, do not need do anything
  if (authToken && (Date.now() < authToken.endTime)) {
    return
  }

  // Do not let token requests occur simultaneously
  if (isGetting) return
  isGetting = true

  // Request to get a new token
  console.log('[INFO] ', 'Request - Get a new token ', new Date().toLocaleString())

  AUTH.getAuth().then(res => {
    if (res.statusText === 'OK') {
      // Consider that the process takes some seconds
      // the calculation takes away 20s to get the end time of the token.
      const expires_in_ms = (res.data.expires_in - 20) * 1000
      const endTime = Date.now() + expires_in_ms

      const token = {
        endTime,
        ...res.data
      }

      localStorage.setItem('AuthToken', JSON.stringify(token))
      console.log('[INFO] ', 'Request - Done ', new Date().toLocaleString())
      isGetting = false
    }
  })
})

/**
 * Get token from LocalStorage if there is valid one
 * @return {Object} The token object or null
 */
const getTokenFromLocal = (() => {
  const authToken = JSON.parse(localStorage.getItem('AuthToken'))

  // If there is no token
  if (!authToken) {
    getAndStoreToken()
    return null
  }

  // If the token get from localStorage is still in time
  if (Date.now() < authToken.endTime) return formatToken(authToken)

  // Or else, need to request for a new token
  getAndStoreToken()
  return null
})

// export API interface
export default {
  /**
   * Search for an Item
   * @param {String} q - The string want to search
   * @param {String} type - The type want to search
   * @return {Object} The axios get promise object
   */
  search (q, type) {
    const AUTH_TOKEN = getTokenFromLocal()

    if (AUTH_TOKEN) {
      // Get token and set headers Authorization
      let instance = axios.create({
        baseURL: API_ROOT
      })
      instance.defaults.headers.common['Authorization'] = AUTH_TOKEN

      return instance.get('search', { params: { q: q, type: type } })
    } else {
      return null
    }
  },

  /**
   * Get info of an Artist
   * @param {String} id - The artist id
   * @return {Object} The axios get method
   */
  artists (id) {
    const AUTH_TOKEN = getTokenFromLocal()

    if (AUTH_TOKEN) {
      // Get token and set headers Authorization
      let instance = axios.create({
        baseURL: API_ROOT
      })
      instance.defaults.headers.common['Authorization'] = AUTH_TOKEN

      return instance.get('artists/' + id)
    } else {
      return null
    }
  },

  /**
   * Get an Artist's Top Tracks
   * @param {String} id - The artist id
   * @return {Object} The axios get method
   */
  topTracks (id) {
    const AUTH_TOKEN = getTokenFromLocal()

    if (AUTH_TOKEN) {
      // Get token and set headers Authorization
      let instance = axios.create({
        baseURL: API_ROOT
      })
      instance.defaults.headers.common['Authorization'] = AUTH_TOKEN

      return instance.get('artists/' + id + '/top-tracks', {params: {country: 'US'}})
    } else {
      return null
    }
  },

  /**
   * Get an Artist's Related Artists
   * @param {String} id - The artist id
   * @return {Object} The axios get method
   */
  releatedArtists (id) {
    const AUTH_TOKEN = getTokenFromLocal()

    if (AUTH_TOKEN) {
      // Get token and set headers Authorization
      let instance = axios.create({
        baseURL: API_ROOT
      })
      instance.defaults.headers.common['Authorization'] = AUTH_TOKEN

      return instance.get('artists/' + id + '/related-artists')
    } else {
      return null
    }
  }
}
