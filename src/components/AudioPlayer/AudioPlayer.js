import React from 'react'
import PlayButton from './PlayButton'

export default class AudioPlayer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      ready: false,
      mode: 'play',
      percent: 0,
      duration: 0,
      buffered: {}
    }
  }

  // Calc the percentage of the play procee
  percentCalc () {
    return this._audio.currentTime / this._audio.duration * 100
  }

  // Get the buffered status of the audio
  bufferHandler () {
    if (this.state.ready) {
      this.setState({
        buffered: this._audio.buffered
      })
    }
  }
  
  playHandler () {
    this.setState({
      percent: this.percentCalc()
    })
  }

  clickHandler () {
    if (this.state.ready) {
      if (this.state.mode === 'play' ) {
        this.setState({
          mode: 'pause'
        })
        if (this.props.url) {
          this._audio.play()
        }
        this.props.playHandler(this.props.id)
      } else {
        this.setState({
          mode: 'play'
        })
        if (this.props.url) {
          this._audio.pause()
        }
        this.props.playHandler('')
      }
    }
  }

  // Change the currentTime of audio
  TrackClickHandler (percent) {
    if (this.state.ready) {
      this._audio.currentTime = this._audio.duration * percent / 100
    }
  }

  // When finished, init the play mode
  endHandler () {
    this.setState({
      mode: 'play',
      percent: 0
    })
    this.props.playHandler('')
  }

  componentDidMount () {
    if (this._audio.error === null) {
      this.setState({
        ready: true
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if ( !nextProps.isPlay ) {
      this.setState({
        mode: 'play'
      })
      this._audio.pause()
    }
  }

  render () {
    return (
      <div className="audio-player" style={this.props.style}>
        <audio onProgress={::this.bufferHandler} onLoadedData={::this.bufferHandler} onTimeUpdate={::this.playHandler} onEnded={::this.endHandler} src={this.props.url} ref={(i) => this._audio = i}></audio>
        <PlayButton showProgress={this.state.ready}
                    mode={this.state.mode}
                    percent={this.state.percent}
                    buffered={this.state.buffered}
                    clickHandler={this.clickHandler}
                    TrackClickHandler={this.TrackClickHandler}
                    fatherRef={this}
        />
      </div>
    )
  }
}
