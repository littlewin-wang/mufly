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

const artists = (state = {past: []}, action) => {
  switch (action.type) {
    case 'GET_PRESENT':
      return {
        past: state.past,
        ...action.artists
      }

    case 'ADD_PAST':
      state.past.push(action.past)
      return state

    case 'RM_PAST':
      state.past.pop()
      return state

    case 'CLEAR_PAST':
      state.past = []
      return state

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

const playing = (state = '', action) => {
  switch (action.type) {
    case 'GET_PLAYING':
      return action.playing

    default:
      return state
  }
}

export { suggestions, loading, artists, tracks, playing }
