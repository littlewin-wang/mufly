import React from 'react'
import AudioPlayer from '../AudioPlayer/AudioPlayer'

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
    const { tracks, visible } = this.props

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
        <span className="audio-player-wrapper" style={styles} key={track.id}>
          <AudioPlayer url={track.url} />
        </span>
      )
    })
  }

  renderTrackNames () {
    const { tracks, playing } = this.props
    const track = tracks.find( t => t.id === playing )

    return (
      <div className="track-name">
        <h6>Now Playing</h6>
        <h4>{ track.name }</h4>
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
