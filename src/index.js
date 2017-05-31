import 'core-js/fn/object/assign'
import ReactDOM from 'react-dom'

// import { Provider } from 'react-redux'
import routes from './routes'

import 'normalize.css'
import 'styles/index.styl'

// Render the main component into the dom
ReactDOM.render(
  routes,
  document.getElementById('app')
)
