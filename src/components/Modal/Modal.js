import React from 'react'
import Squares from 'react-activity/lib/Squares'

import './Modal.styl'

export default class GithubLink extends React.Component {
  render () {
    return (
      <div className="modal">
        <Squares className="modal-process" color="#727981" size={48} speed={1} />
      </div>
    )
  }
}
