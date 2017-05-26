import React from 'react'
import classNames from 'classnames'

export default class Node extends React.Component {
  constructor (props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler () {
    // return this.props.actions.updateUrl(this.props.artist.get('id'));
  }

  render () {
    const { region, radius, x, y, rejected, artist } = this.props
    const artistName = artist.name

    const classes = classNames([ 'node', region.toLowerCase(), { rejected } ])

    let styles = {}

    if ( rejected ) {
      styles.animationName = 'rejected'
      styles.animationDuration = '500ms'
      styles.animationFillMode = 'forwards'
      styles.animationTimingFunction = 'ease'
    } else {
      styles.animationName = 'fadeIn'
      styles.animationDuration = '500ms'
      styles.animationFillMode = 'forwards'
      styles.animationTimingFunction = 'ease'
    }

    return (
      <g>
        <svg
          width={radius * 2}
          height={radius * 2}
          x={x}
          y={y}
          onClick={this.clickHandler}
        >
          <g className={classes} style={styles}>
            <circle cx="50%" cy="50%" r="48%" fill="#FFFFFF" />
            <text x="50%" y="51%" textAnchor="middle">{artistName}</text>
          </g>
        </svg>
      </g>
    )
  }
}
