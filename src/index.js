import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'
import { SearchBox } from 'components'

// Render the main component into the dom

ReactDOM.render(<SearchBox loading={ true }/>, document.getElementById('app'))
