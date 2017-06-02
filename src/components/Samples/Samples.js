import React from 'react'
import AudioPlayer from '../AudioPlayer/AudioPlayer'

import './Samples.styl'

export default class Samples extends React.Component {
  componentWillMount () {
    this.setState({
      enableButtonAnimation: false
    })
  }

  componentWillReceiveProps (nextProps) {
    if ( nextProps.visible )
      this.setState({
        enableButtonAnimation: true
      })
  }

  renderAudioPlayers () {
    const { tracks, visible, playing } = this.props

    return tracks.map( (track, index) => {
      let styles = {}

      if ( this.state.enableButtonAnimation ) {
        if ( visible ) {
          styles = {
            opacity: 0,
            animationName: 'button-enter',
            animationFillMode: 'forwards',
            animationDuration: '600ms',
            animationTimingFunction: 'ease',
            animationDelay: `${500 + index*50}ms`
          }
        } else {
          styles = {
            opacity: 1,
            animationName: 'button-exit',
            animationFillMode: 'forwards',
            animationDuration: '600ms',
            animationTimingFunction: 'ease',
            animationDelay: `${index*50}ms`
          }
        }
      }

      return (
        <AudioPlayer key={track.id} url={track.url} style={styles} id={track.id} isPlay={playing===track.id} playHandler={::this.props.playHandler}/>
      )
    })
  }

  renderTrackNames () {
    const { tracks, playing } = this.props
    const track = tracks.find( t => t.id === playing )

    return (
      <div className="track-name">
        { track &&
          <h6>Now Playing</h6>
        }
        { track &&
          <h4>{ track.name }</h4>
        }
      </div>
    )
  }

  render () {
    return (
      <div className="samples-wrapper">
        <div className="samples">
          { this.renderAudioPlayers() }
          { this.renderTrackNames() }
        </div>
      </div>
    )
  }
}
