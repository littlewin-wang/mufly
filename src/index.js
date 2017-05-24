import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'

// import { Provider } from 'react-redux'
// import routes from './routes'

import 'normalize.css'
import 'styles/index.styl'

// import SearchContainer from './containers/SearchContainer'

import { AudioPlayer } from 'components'

// Render the main component into the dom
ReactDOM.render(
  <AudioPlayer url={'https://p.scdn.co/mp3-preview/d3e7d359946a15b2ecb19efaa87147523e067dbc?cid=null'} />,
  document.getElementById('app')
)
