const axios = require('axios')

const API_ROOT = 'https://api.spotify.com/v1/'
const AUTH_TOKEN = 'Bearer BQAd-ecFmgpkZ82hurrfIXylGYzIsjoaxrMTDxU9vm4n8tnTRGtxl8F97ibAGtVEGGH1OH4M9UEYUqHTB5u3BA'

axios.default.withCredentials = true
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

// export API interface
export default {
  // Search for an Item
  search (q, type) {
    return axios.get(API_ROOT.concat('search'), { params: { q: q, type: type } })
  },

  // Get info of an Artist
  artists (id) {
    return axios.get(API_ROOT.concat('artists/') + id)
  },

  // Get an Artist's Top Tracks
  topTracks (id) {
    return axios.get(API_ROOT.concat('artists/') + id + '/top-tracks', { params: { country: 'US' }})
  },

  // Get an Artist's Related Artists
  releatedArtists (id) {
    return axios.get(API_ROOT.concat('artists/') + id + '/related-artists')
  }
}
