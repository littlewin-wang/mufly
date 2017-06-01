import API from 'helpers/api'

export const GET_SEARCH = (suggestions) => {
  return {
    type: 'GET_SEARCH',
    suggestions
  }
}

export const GET_SEARCH_RESULTS = (q, type) => {
  return (dispatch => {
    API.search(q, type).then(res => {
      if (res.statusText === 'OK') {
        dispatch(GET_SEARCH(res.data.artists.items))
      }
    })
  })
}
