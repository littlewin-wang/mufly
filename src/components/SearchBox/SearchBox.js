import React, { PropTypes } from 'react'
import Spinner from 'react-activity/lib/Spinner'
import Suggestions from '../Suggestions/Suggestions'

import isNumber from 'lodash/isNumber'

export default class SearchBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedIndex: null
    }
  }

  componentDidMount () {
    this._input.focus()
  }

  static propTypes = {
    loading: PropTypes.bool,
    requestSearchSuggestions: PropTypes.func,
    clearSearchInput: PropTypes.func
  }

  static defaultProps = {
    loading: false
  }

  changeHandler (ev) {
    const { requestSearchSuggestions, clearSearchInput} = this.props
    const searchItem = ev.target.value

    searchItem ? requestSearchSuggestions(searchItem) : clearSearchInput()
  }

  ctrlHandler (ev) {
    let selected = this.state.selectedIndex
    const KEYS = {
      UP: 38,
      DOWN: 40,
      ENTER: 13
    }

    switch (ev.which) {
      case KEYS.UP:
        if ( selected > 0 ) {
          this.setState({selectedIndex: selected - 1})
        }
        break
      case KEYS.DOWN:
        if ( selected < 8 ) {
          this.setState({selectedIndex: isNumber(selected) ? selected + 1 : 0})
        }
        break
      case KEYS.ENTER:
        this.selectHandler(selected)
        break
    }
  }

  selectHandler (selectedIndex) {
    this.setState({
      selectedIndex,
      confirmedIndex: selectedIndex
    })
    console.log('YES')
  }

  renderLoading () {
    return (
      <div className="search-input-loading">
        <Spinner />
      </div>
    )
  }

  render () {
    let { loading } = this.props
    let { selectedIndex, confirmedIndex } = this.state

    // const suggestions = [{id: 0, name: 'zero'}, {id: 1, name: 'one'}, {id: 2, name: 'two'}, {id: 3, name: 'three'}]
    const suggestions = []

    return (
      <div className="search-box">
        { loading ? this.renderLoading() : null}
        <input
          type="text"
          className="search-input"
          onChange={::this.changeHandler}
          onKeyUp={::this.ctrlHandler}
          ref={(i) => this._input = i}
        />
        <Suggestions suggestions={suggestions}
                     selectedIndex={selectedIndex}
                     confirmedIndex={confirmedIndex}
                     clickHandler={this.selectHandler}
                     fatherRef={this}/>
      </div>
    )
  }
}
