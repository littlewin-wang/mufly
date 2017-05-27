import React from 'react'
import Line from './Line'
import Node from './Node'

import './NodeGraph.styl'

export default class NodeGraph extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.calculateNodeAndLinePositions(props)
  }

  calculateResponsiveRadiusAndRegions () {
    const width   = window.innerWidth
    const height  = window.innerHeight
    const mode    = ( width <= 750 && width < height ) ? 'mobile' : 'desktop'
    const radius  = mode === 'mobile' ? width * 0.18 : height * 0.1

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
            height * 3/4 + height * -1/20 - radius,
            height * 3/4 + height *  1/20 - radius,
            height * 3/4 + height * -1/20 - radius
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

  calculateNodeAndLinePositions (props = this.state) {
    // const { radius, coords } = this.calculateResponsiveRadiusAndRegions()
  }

  render () {
    const { radius, coords } = this.calculateResponsiveRadiusAndRegions()
    return (
      <svg className="node-graph">
        <Line x1={157} y1={285} x2={471} y2={285} />
        <Node region={'PRESENT'} radius={radius} x={coords.PRESENT.x} y={coords.PRESENT.y} artist={{name: 'Littlewin'}} />
        <Node region={'FUTURE'} radius={radius} x={coords.FUTURE.x[0]} y={coords.FUTURE.y[0]} artist={{name: 'Littlewin'}} />
        <Node region={'FUTURE'} radius={radius} x={coords.FUTURE.x[1]} y={coords.FUTURE.y[1]} artist={{name: 'Littlewin'}} />
        <Node region={'FUTURE'} radius={radius} x={coords.FUTURE.x[2]} y={coords.FUTURE.y[2]} artist={{name: 'Littlewin'}} />
      </svg>
    )
  }
}
