import React from 'react'
import classNames from 'classnames'

export default class Line extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      shouldExtend: true
    }
  }

  componentWillReceiveProps () {
    // If we've received new props, but our state of 'expanding' hasn't changed,
    // we don't need to re-animate the expansion.
    this.setState({
      shouldExtend: this.props.expanding === undefined
    })
  }

  calculateLineLength (x1, y1, x2, y2) {
    return Math.sqrt( Math.pow( (x1 - x2), 2 ) + Math.pow( (y1 - y2), 2 ) )
  }

  setDashStyles (x1, y1, x2, y2, styles = {}) {
    const edgeLength = this.calculateLineLength(x1, y1, x2, y2)
    styles.strokeDasharray  =  edgeLength
    styles.strokeDashoffset =  edgeLength
    return styles
  }

  render () {
    let { retracting, expanding, x1, y1, x2, y2 } = this.props

    const classes = classNames({ retracting, expanding })
    let styles = {}

    // If `expanding` is undefined, it means it hasn't yet been "activated".
    // Don't show it.
    // if ( typeof expanding === 'undefined' && typeof retracting === 'undefined') {
    //   return <line />
    // }

    if ( retracting ) {
      styles = this.setDashStyles(x1, y1, x2, y2)
      styles.animationName            = 'retract'
      styles.animationDirection       = 'reverse'
      styles.animationTimingFunction  = 'ease'
      styles.animationDuration        = '500ms'
      styles.animationDelay           = '400ms'
      styles.animationFillMode        = 'both'
    }

    else if ( expanding && this.state.shouldExtend ) {
      styles = this.setDashStyles(x1, y1, x2, y2)
      styles.animationName            = 'expand'
      styles.animationDirection       = 'reverse'
      styles.animationTimingFunction  = 'ease'
      styles.animationDuration        = '500ms'
      styles.animationDelay           = '400ms'
      styles.animationFillMode        = 'both'
    }

    return (
      <line
        className={classes}
        style={styles}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
      />
    )
  }
}
