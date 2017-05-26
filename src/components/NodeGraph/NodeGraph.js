import React from 'react'
import Line from './Line'
import Node from './Node'

import './NodeGraph.styl'

export default class NodeGraph extends React.Component {

  render () {
    return (
      <svg className="node-graph">
        <Line x1={157} y1={285} x2={471} y2={285} />
        <Node region={'FUTURE'} radius={57} x={704.45} y={85.5} artist={{name: 'Littlewin'}} />
      </svg>
    )
  }
}
