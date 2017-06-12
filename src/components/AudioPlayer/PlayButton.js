import React, { PropTypes } from 'react'
import { Circle } from 'rc-progress'
import './PlayButton.styl'

import PauseIcon from './svg/PauseIcon'
import PlayIcon from './svg/PlayIcon'

import range from 'lodash/range'

export default class PlayButton extends React.Component {

  static propTypes = {
    mode: PropTypes.oneOf(['play', 'pause']),
    showProgress: PropTypes.bool,
    percent: PropTypes.number,
    duration: PropTypes.number,
    buffered: PropTypes.object,
    clickHandler: PropTypes.func,
    TrackClickHandler: PropTypes.func
  }

  static defaultProps = {
    mode: 'play',
    showProgress: false,
    percent: 0,
    duration: 0,
    buffered: {}
  }

  // Calc the percent based on the click position
  handleTrackClick = (e) => {
    const mouseX = e.pageX - e.currentTarget.getBoundingClientRect().left
    const mouseY = e.pageY - e.currentTarget.getBoundingClientRect().top
    const circleCenterX = e.currentTarget.offsetWidth/2
    const circleCenterY = e.currentTarget.offsetHeight/2
    const angle = Math.atan2(mouseY - circleCenterY, mouseX - circleCenterX)
    const degree = (angle * 180/Math.PI + 360) % 360
    const percent = ((degree/360) * 100) - 75
    this.props.TrackClickHandler.bind(this.props.fatherRef, (percent > 0 ? percent : 100 + percent))()
  }

  render () {

    let icon = <PauseIcon />
    switch (this.props.mode) {
      case 'play':
        icon = <PlayIcon className="audio-control-play"/>
        break
    }

    return (
      <div className="play-button">
        {
          this.props.showProgress && range(0, this.props.buffered.length).map((i) => {
            const d = this.props.duration
            const start = this.props.buffered.start(i)
            const end = this.props.buffered.end(i)
            const buffer = (end - start) / d

            return <div key={i} style={{transform: `rotate(${360*(start/d)} deg)`}}
                        className="audio-control-progress-container">
              <Circle percent={buffer*100}
                      strokeColor="#BBBBBB" strokeWidth={6} trailColor="#FFFFFFFF" />
            </div>
          })
        }
        { this.props.showProgress && <Circle percent={this.props.percent} strokeColor="#E76161" strokeWidth={6} trailColor="#FFFFFFFF" /> }
        { this.props.showProgress &&
          <div onClick={this.handleTrackClick} className="rc-progress-circle">
            <Circle percent={100} strokeColor="#00000000" strokeWidth={12} trailColor="#00000000" />
          </div>
        }
        <button className="audio-control" onClick={this.props.clickHandler.bind(this.props.fatherRef)}>
          { icon }
        </button>
      </div>
    )
  }
}
