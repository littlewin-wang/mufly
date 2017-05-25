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
  <AudioPlayer url={'http://m10.music.126.net/20170525102947/f835ddb0966e2bb282470873027dc7e3/ymusic/6e01/a4d4/bbef/2dda07904eb54d44abb278165e1c6ead.mp3'} />,
  document.getElementById('app')
)
