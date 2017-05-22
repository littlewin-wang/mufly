import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'
import { RecentSearch } from 'components'

// Render the main component into the dom
const recents = [{id: 0, name: 'test0'}, {id: 1, name: 'test1'}, {id: 2, name: 'test2'}, {id: 3, name: 'test3'}]

ReactDOM.render(<RecentSearch recents={ recents }/>, document.getElementById('app'))
