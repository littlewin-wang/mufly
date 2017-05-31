import React from 'react'
import { Link } from 'react-router'

export default class Back extends React.Component {
  render () {
    return (
      <Link to="/">
        <div className="back">
          <svg style={{ width: 45, height: 45}} viewBox="0 0 2048 2048">
            <path d="M1331 672q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z" />
          </svg>
          Start Over
        </div>
      </Link>
    )
  }
}
