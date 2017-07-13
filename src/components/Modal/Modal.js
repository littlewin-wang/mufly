import React from 'react'
import Sentry from 'react-activity/lib/Sentry'

import './Modal.styl'

export default class GithubLink extends React.Component {
  render () {
    return (
      <div className="modal">
        <Sentry className="modal-process" color="#57caf4" size={32} speed={1} />
      </div>
    )
  }
}
