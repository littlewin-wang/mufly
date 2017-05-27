import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'

// import { Provider } from 'react-redux'
// import routes from './routes'

import 'normalize.css'
import 'styles/index.styl'

import { NodeGraph } from 'components'

// const tracks = [
//   {
//     id: '6Rt6KwuF7I8ZkdZG2G0bYr',
//     url: 'https://p.scdn.co/mp3-preview/5394576429c15cd465bccfafb1fffbf971ee53d6?cid=null',
//     name: 'The Only Thing'
//   },
//   {
//     id: '5I6y1KWmUoV5YCaIEcs1qs',
//     url: 'https://p.scdn.co/mp3-preview/f5e665476d6617919aafb00bd6ef3c9912f037a9?cid=null',
//     name: 'Should Have Known Better'
//   },
//   {
//     id: '3tchJ8gDgMdaSxpaLxlr1F',
//     url: 'https://p.scdn.co/mp3-preview/b0065987280a8bd8692ec1ab91e001c3a480f12c?cid=null',
//     name: 'To Be Alone With You'
//   }
// ]

const NodeAndLines = {
  nodes: [
    {id:'Test1', region: 'PAST', regionIndex: 1},
    {id:'Test2', region: 'PRESENT', regionIndex: 1},
    {id:'Test3', region: 'FUTURE', regionIndex: 0},
    {id:'Test4', region: 'FUTURE', regionIndex: 1},
    {id:'Test5', region: 'FUTURE', regionIndex: 2}
  ],
  lines: [
    {from: 'Test1', to: 'Test2'},
    {from: 'Test2', to: 'Test3'},
    {from: 'Test2', to: 'Test4'},
    {from: 'Test2', to: 'Test5'}
  ]
}

// Render the main component into the dom
ReactDOM.render(
  <NodeGraph nodes={NodeAndLines.nodes} lines={NodeAndLines.lines} />,
  document.getElementById('app')
)
