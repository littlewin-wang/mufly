import React from 'react'

export default class ArtistAvatar extends React.Component {
  render() {
    const mode = ( window.innerWidth < 750 ) ? 'mobile' : 'desktop'

    let styles

    return (
      <div id="artist-avatar-wrapper">
        <div id="artist-avatar" style={styles} />
        <div className="node-spacer" />
      </div>
    )
  }
}
