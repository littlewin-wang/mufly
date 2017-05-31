import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'

// import { Provider } from 'react-redux'
// import routes from './routes'

import 'normalize.css'
import 'styles/index.styl'

import NodeGraphContainer from 'containers/NodeGraphContainer'

// Render the main component into the dom
ReactDOM.render(
  <NodeGraphContainer />,
  document.getElementById('app')
)
