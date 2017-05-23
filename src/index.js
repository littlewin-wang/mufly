import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'

// import { Provider } from 'react-redux'
// import routes from './routes'

import 'normalize.css'
import 'styles/index.styl'

import SearchContainer from './containers/SearchContainer'

// Render the main component into the dom
ReactDOM.render(
  <SearchContainer />,
  document.getElementById('app')
)
