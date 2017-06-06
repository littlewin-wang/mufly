import React from 'react'
import Line from './Line'
import Node from './Node'
import { isEmpty, compact } from 'lodash'

import './NodeGraph.styl'

export default class NodeGraph extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.calculateNodeAndLinePositions(props)
  }

  componentDidMount () {
    this.resizeHandler = () => {
      this.setState(this.calculateNodeAndLinePositions())
    }
    window.addEventListener('resize', this.resizeHandler)
  }

  componentWillReceiveProps (nextProps) {
    this.state = this.calculateNodeAndLinePositions(nextProps)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeHandler)
  }

  calculateResponsiveRadiusAndRegions () {
    const width   = window.innerWidth
    const height  = window.innerHeight
    const mode    = ( width <= 750 && width < height ) ? 'mobile' : 'desktop'
    const radius  = mode === 'mobile' ? width * 0.12 : height * 0.1

    let coords = { }

    if ( mode === 'mobile' ) {
      coords = {
        ['CATACOMBS']: {
          x: width * 1/2 - radius,
          y: height * -1/4 - radius
        },
        ['GRAVEYARD']: {
          x: width * 1/2 - radius,
          y: height * -1/4 - radius
        },
        ['PAST']: {
          x: width * 1/2 - radius,
          y: height * -1/4 - radius
        },
        ['PRESENT']: {
          x: width * 1/2 - radius,
          y: height * 1/4 - radius
        },
        ['FUTURE']: {
          x: [
            width * 1/6 - radius,
            width * 3/6 - radius,
            width * 5/6 - radius
          ],
          y: [
            // TODO: slight offsets
            height * 4/9 + height * -1/20 - radius,
            height * 4/9 + height *  1/20 - radius,
            height * 4/9 + height * -1/20 - radius
          ]
        }
      }
    } else {
      coords = {
        ['CATACOMBS']: {
          x: width * -1/4 - radius,
          y: height * 1/2 - radius
        },
        ['GRAVEYARD']: {
          x: width * -1/4 - radius,
          y: height * 1/2 - radius
        },
        ['PAST']: {
          x: width *  1/6 - radius,
          y: height * 1/2 - radius
        },
        ['PRESENT']: {
          x: width *  3/6 - radius,
          y: height * 1/2 - radius
        },
        ['FUTURE']: {
          x: [
            width * 5/6 + width * -1/40 - radius,
            width * 5/6 + width *  1/40 - radius,
            width * 5/6 + width * -1/40 - radius
          ],
          y: [
            height * 3/12 - radius,
            height * 6/12 - radius,
            height * 9/12 - radius
          ]
        }
      }
    }

    return { radius, coords }
  }

  updateLinesFromNodes (nodes, lines) {
    const radius = nodes[0].radius

    return lines.map( line => {
      if (!isEmpty(line)) {
        const fromNode = nodes.find( node => node.id === line.from)
        const toNode = nodes.find( node => node.id === line.to)

        return {
          ...line,
          x1: fromNode.x + radius,
          y1: fromNode.y + radius,
          x2: toNode.x + radius,
          y2: toNode.y + radius
        }
      }
    })
  }

  calculateNodeAndLinePositions (props = this.state) {
    const { radius, coords } = this.calculateResponsiveRadiusAndRegions()

    const nodes = compact(props.nodes.map( node => {
      if (!isEmpty(node)) {
        let x = coords[node.region]['x']
        let y = coords[node.region]['y']

        if (typeof x === 'object') x = x[node.regionIndex]
        if (typeof y === 'object') y = y[node.regionIndex]

        return {
          ...node,
          x: x,
          y: y,
          radius: radius
        }
      }
    }))

    const lines = compact(this.updateLinesFromNodes(nodes, props.lines))

    return { nodes, lines }
  }

  render () {
    const { nodes, lines } = this.state

    return (
      <svg className="node-graph">
        {lines.map( (line, index) => (
          <Line key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                expanding={true}
          />
        ))}

        {nodes.map( (node, index) => (
          <Node key={index}
                artist={{id: node.id, name: node.name}}
                region={node.region}
                radius={node.radius}
                rejected={false}
                x={node.x}
                y={node.y}
                nodeClickHandler={::this.props.nodeClickHandler}
          />
        ))}
      </svg>
    )
  }
}
