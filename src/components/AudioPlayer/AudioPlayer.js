import React from 'react'
import PlayButton from './PlayButton'

export default class AudioPlayer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showProgress: true,
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

  playHandler () {
    this.setState({
      percent: this.percentCalc()
    })
  }

  render () {
    return (
      <div className="audio-player">
        <audio onTimeUpdate={::this.playHandler} src={this.props.url} ref={(i) => this._audio = i}></audio>
        <PlayButton showProgress={this.state.showProgress}
                    percent={this.state.percent}
        />
      </div>
    )
  }
}
