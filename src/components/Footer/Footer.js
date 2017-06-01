import React from 'react'

export default class Footer extends React.Component {
  render () {
    return (
      <footer className="footer">
        <h4>
          Made by <a className="raised-link me" href="https://github.com/littlewin-wang">Littlewin</a>, Powered by <a className="raised-link spotify" href="https://www.spotify.com">Spotify</a>.
        </h4>
      </footer>
    )
  }
}
