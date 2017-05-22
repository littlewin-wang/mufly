import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'
import { Suggestions } from 'components'

// Render the main component into the dom
const suggestions = [{id: 0, name: 'zero'}, {id: 1, name: 'one'}, {id: 2, name: 'two'}, {id: 3, name: 'three'}]

let selectedIndex = null
let confirmedIndex = null

const testFun = (index) => {
  if (( index > 0 ) && ( index < suggestions.length)) {
    confirmedIndex = index
    console.log('YES')
  }
}

ReactDOM.render(<Suggestions  suggestions={suggestions}
                              selectedIndex={selectedIndex}
                              confirmedIndex={confirmedIndex}
                              clickFun={testFun}/>, document.getElementById('app'))
