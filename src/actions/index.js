import API from 'helpers/api'

export const GET_SEARCH = (suggestions) => {
  return {
    type: 'GET_SEARCH',
    suggestions
  }
}

export const CLEAR_SEARCH = (suggestions) => {
  return {
    type: 'GET_SEARCH',
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

export const GET_TRACKS = (tracks) => {
  return {
    type: 'GET_TRACKS',
    tracks
  }
}

export const GET_SEARCH_RESULTS = (q, type) => {
  return (dispatch => {
    dispatch(START_LOADING())
    API.search(q, type).then(res => {
      if (res.statusText === 'OK') {
        dispatch(GET_SEARCH(res.data.artists.items))
        dispatch(END_LOADING())
      }
    })
  })
}

export const CLEAR_SEARCH_RESULTS = () => {
  return (dispatch => {
    dispatch(CLEAR_SEARCH())
    dispatch(END_LOADING())
  })
}

export const GET_TOP_TRACKS = (id) => {
  return (dispatch => {
    API.topTracks(id).then(res => {
      if (res.statusText === 'OK') {
        console.log(res.data.tracks)
        dispatch(GET_TRACKS(res.data.tracks))
      }
    })
  })
}
