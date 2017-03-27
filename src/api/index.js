const axios = require('axios')

const API_ROOT = 'https://api.spotify.com/v1/'

axios.default.withCredentials = true

// export API interface
export default {
  // Search for an Item
  search(q, type) {
    return axios.get(API_ROOT.concat('search'), { params: { q: q, type: type } })
  },

  // Get an Artist's Top Tracks
  topTracks(id) {
    return axios.get(API_ROOT.concat('artists/') + id + '/top-tracks', { params: { country: 'US' }})
  },

  // Get an Artist's Related Artists
  releatedArtists(id) {
    return axios.get(API_ROOT.concat('artists/') + id + '/related-artists')
  }
}
