import React, { PropTypes } from 'react'
import './Avatar.styl'

export default class Avatar extends React.Component {
  static propTypes = {
    artistAvatarUrl: PropTypes.string,
    artistVisible: PropTypes.bool
  }

  static defaultProps = {
    artistAvatarUrl: '',
    artistVisible: false
  }

  render () {
    const mode = ( window.innerWidth < 750 ) ? 'mobile' : 'desktop'
    let { artistAvatarUrl, artistVisible } = this.props

    let styles
    if ( mode === 'mobile' ) {
      styles = {
        opacity: artistVisible ? 1 : 0,
        backgroundImage: `url('${artistAvatarUrl}')`,
        transition: 'opacity 1000ms ease'
      }
    } else {
      styles = {
        opacity: artistVisible ? 1 : 0.75,
        transform: artistVisible ? 'translateY(0) scale(1, 1)' : 'translateY(230px) scale(0, 0)',
        borderRadius: artistVisible ? '0px' : '100%',
        backgroundImage: `url('${artistAvatarUrl}')`,
        transition: `opacity 1000ms ease,
                     transform 1000ms ease,
                     border-radius 1000ms ease-out 150ms`
      }
    }

    return (
      <div className="avatar-wrapper">
        <div className="avatar" style={styles}>
        </div>
      </div>
    )
  }
}
