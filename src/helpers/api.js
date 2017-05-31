const axios = require('axios')

const API_ROOT = 'https://api.spotify.com/v1/'
const AUTH_TOKEN = 'Bearer BQC9Fy7SXAHPulgoz6K5Z_5rb-RCn2zADP5P2a5PTTiCxiWk3EJuNGCZJ8JJvhMmU7ALAgQuuqYIv_7tjZ5tLfi2Oi-_LGcSkp2ZAI_VHQVErX8KVFMa8XbFp1T6CtsTAScnRZGlRVr22QPMaiGjpKRlr7IHVpY_DUsNodgZyHtvuNKafK_vTr07M4aF6gNZAoITl_kMcK_1dhMl5nn73EvdJ3aSqXh51JwLK-iVf_-uM1FUkAOn5a1JhlySLz43aTb9bbzMDhztgyVlHcr-HmQ92gKXZnKwWAaovW3SToALtUrUpTe3LLvZuO5bIIWerDcidwnI39Ub8jHuMA8R_Q'

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
