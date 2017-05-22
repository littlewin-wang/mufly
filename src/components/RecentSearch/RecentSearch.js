import React, { PropTypes } from 'react'
import classNames from 'classnames'

export default class RecentSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  static propTypes = {
    recents: PropTypes.array
  }

  static defaultProps = {
    recents: []
  }

  clickHandler (id) {
    this.setState({ selected: id })
  }

  render () {
    let { recents } = this.props

    return (
      <div className="recent-search">
        <h5 className="heading">Recent Searches</h5>
        <ul>
          {recents.map( (recent, index) => (
            <li
              className={classNames({
                faded: this.state.selected && this.state.selected !== recent.id
              })}
              key={index}
            >
              <a onClick={ () => this.clickHandler(recent.id) }>
                {recent.name}
              </a>
              {recents.length - index > 1 ? ',' : '.'}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
