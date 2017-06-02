const suggestions = (state = [], action) => {
  switch (action.type) {
    case 'GET_SEARCH':
      return action.suggestions

    case 'CLEAR_SEARCH':
      return []

    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return true

    case 'END_LOADING':
      return false

    default:
      return state
  }
}

const artists = (state = {}, action) => {
  switch (action.type) {
    case 'GET_PRESENT':
      return action.artists

    default:
      return state
  }
}

const tracks = (state = [], action) => {
  switch (action.type) {
    case 'GET_TRACKS':
      return action.tracks

    default:
      return state
  }
}

export { suggestions, loading, artists, tracks }
