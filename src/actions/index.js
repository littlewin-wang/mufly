import API from 'helpers/api'
const DEFAULT_AVATAR = 'https://raw.githubusercontent.com/littlewin-wang/mufly/master/image/default-avatar.png'

export const GET_SEARCH = (suggestions) => {
  return {
    type: 'GET_SEARCH',
    suggestions
  }
}

export const CLEAR_SEARCH = (suggestions) => {
  return {
    type: 'CLEAR_SEARCH',
    suggestions
  }
}

export const START_LOADING = (loading) => {
  return {
    type: 'START_LOADING',
    loading
  }
}

export const END_LOADING = (loading) => {
  return {
    type: 'END_LOADING',
    loading
  }
}

export const GET_PRESENT = (artists) => {
  return {
    type: 'GET_PRESENT',
    artists
  }
}

export const ADD_PAST = (past) => {
  return {
    type: 'ADD_PAST',
    past
  }
}

export const RM_PAST = (past) => {
  return {
    type: 'RM_PAST',
    past
  }
}

export const CLEAR_PAST = () => {
  return {
    type: 'CLEAR_PAST'
  }
}

export const GET_TRACKS = (tracks) => {
  return {
    type: 'GET_TRACKS',
    tracks
  }
}

export const GET_PLAYING = (playing) => {
  return {
    type: 'GET_PLAYING',
    playing
  }
}

/**
 * Get the search result and dispatch them to suggestion
 * @param {String} q - The string want to search
 * @param {String} type - The type want to search
 */
export const GET_SEARCH_RESULTS = (q, type) => {
  return (dispatch => {
    let api = API.search(q, type)
    if (api) {
      // Start loading, and show the spinner component
      dispatch(START_LOADING())
      api.then(res => {
        if (res.statusText === 'OK') {
          dispatch(GET_SEARCH(res.data.artists.items))
          // End loading to unshow the spinner component
          dispatch(END_LOADING())
        }
      })
    } else {
      // TODO: Mark a status
      return
    }
  })
}

export const CLEAR_SEARCH_RESULTS = () => {
  return (dispatch => {
    dispatch(CLEAR_SEARCH())
    dispatch(END_LOADING())
  })
}

/**
 * Get the present artist and related-artists of the present
 * @param {String} id - The id of present artist
 * @param {String} ignoreId - The id of ignore artist
 */
export const GET_PRESENT_ARTIST = (id, ignoreId) => {
  let artists = {
    present: {},
    future: []
  }

  return (dispatch => {
    let api = API.artists(id)
    if (api) {
      // Start loading, and show the sentry component
      dispatch(START_LOADING())
      api.then(res => {
        if (res.statusText === 'OK') {
          // Hack - In case that there is no images property
          let imgUrl = res.data.images.length ? res.data.images[0].url : DEFAULT_AVATAR
          artists.present = {id: id, name: res.data.name, image: imgUrl}

          // Find the related artists
          let apiInner = API.releatedArtists(id)
          if (apiInner) {
            apiInner.then(res => {
              if (res.statusText === 'OK') {
                if (res.data.artists && res.data.artists.length) {
                  for (let i = 0; i < res.data.artists.length; i++) {
                    // Hack - In case that there is no images property
                    imgUrl = res.data.artists[i].images.length ? res.data.artists[i].images[0].url : DEFAULT_AVATAR
                    let artist = {id: res.data.artists[i].id, name: res.data.artists[i].name, image: imgUrl}
                    // Need to ignore some id
                    if (artist.id !== ignoreId) {
                      artists.future.push(artist)
                    }
                    // Need 3 artists at most
                    if (artists.future.length === 3) {
                      break
                    }
                  }
                }
                // End loading to unshow the sentry component
                dispatch(END_LOADING())
                dispatch(GET_PRESENT(artists))
              }
            })
          } else {
            // End loading to unshow the sentry component
            dispatch(END_LOADING())
            // TODO: Mark a status
            return
          }
        }
      })
    } else {
      // TODO: Mark a status
      return
    }
  })
}

export const ADD_PAST_ARTIST = (artist) => {
  return dispatch => {
    dispatch(ADD_PAST(artist))
  }
}

export const RM_PAST_ARTIST = (artist) => {
  return dispatch => {
    dispatch(RM_PAST(artist))
  }
}

export const CLEAR_PAST_ARTISTS = () => {
  return dispatch => {
    dispatch(CLEAR_PAST())
  }
}

/**
 * Get the top tracks of the present artist
 * @param {String} id - The id of present artist
 */
export const GET_TOP_TRACKS = (id) => {
  return (dispatch => {
    let api = API.topTracks(id)
    if (api) {
      api.then(res => {
        if (res.statusText === 'OK') {
          // HACK: In case that there is no tracks
          if (res.data.tracks && res.data.tracks.length != 0) {
            let tracks = []
            // HACK: In case that there is less than 3 tracks
            let len = res.data.tracks.length < 3 ? res.data.tracks.length : 3
            for (let i = 0; i < len; i++) {
              let track = {id: res.data.tracks[i].id, name: res.data.tracks[i].name, url: res.data.tracks[i].preview_url}
              tracks.push(track)
            }
            dispatch(GET_TRACKS(tracks))
          } else {
            dispatch(GET_TRACKS([]))
          }
        }
      })
    } else  {
      // TODO: Mark a status
      return
    }
  })
}

export const GET_PLAYING_TRACK = (id) => {
  return (dispatch => {
    dispatch(GET_PLAYING(id))
  })
}
