const suggestions = (state = [], action) => {
  switch (action.type) {
    case 'GET_SEARCH':
      return [action.suggestions]

    default:
      return state
  }
}

export { suggestions }
