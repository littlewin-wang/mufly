import React, { PropTypes } from 'react'
import classNames from 'classnames'
// import Spinner from 'react-activity/lib/Spinner'

export default class Suggestions extends React.Component {
  static propTypes = {
    suggestions: PropTypes.array,
    selectedIndex: PropTypes.number,
    confirmedIndex: PropTypes.number,
    clickFun: PropTypes.func
  }

  static defaultProps = {
    suggestions: [],
    selectedIndex: null,
    confirmedIndex: null
  }

  render () {
    let { suggestions, selectedIndex, confirmedIndex, clickFun } = this.props

    return (
      <div className="suggestions">
        {suggestions.map( (suggestion, i) => (
          <div
            className={classNames([
              'suggestion',
              selectedIndex === i ? 'highlighted' : null,
              confirmedIndex === i ? 'confirmed' : null
            ])}
            key={suggestion.id}
            onClick={clickFun.bind(this, i)}
          >
            { suggestion.name }
          </div>
        ))}
      </div>
    )
  }
}
