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

  percentCalc () {
    return this._audio.currentTime / this._audio.duration * 100
  }

  // progressHandler () {
  //   console.log(this._audio.buffered)
  //   this.setState({
  //     buffered: this._audio.buffered
  //   })
  // }
  canPlayHandler () {
    this.setState({
      ready: true
    })
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
        this._audio.play()
      } else {
        this.setState({
          mode: 'play'
        })
        this._audio.pause()
      }
    }
  }

  render () {
    return (
      <div className="audio-player">
        <audio onCanPlayThrough={::this.canPlayHandler} onTimeUpdate={::this.playHandler} src={this.props.url} ref={(i) => this._audio = i}></audio>
        <PlayButton showProgress={this.state.ready}
                    mode={this.state.mode}
                    percent={this.state.percent}
                    clickHandler={this.clickHandler}
                    fatherRef={this}
        />
      </div>
    )
  }
}
