import React  from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

import { SearchBox, RecentSearch, GithubLink, Footer } from 'components'

class SearchContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  requestSearchSuggestions (q) {
    this.props.actions.GET_SEARCH_RESULTS(q, 'artist')
  }

  clearSearchInput () {
    this.props.actions.CLEAR_SEARCH_RESULTS()
  }

  formatSuggestions (arr) {
    if (arr[0]) {
      let retArr = []
      let len = arr[0].length > 8 ? 8 : arr[0].length

      for (let i = 0; i < len; i++) {
        let suggestion = {
          id: arr[0][i].id,
          name: arr[0][i].name
        }
        retArr.push(suggestion)
      }

      return retArr
    } else {
      return []
    }
  }

  confirmSelectSuggestion (id) {
    this.props.actions.GET_TOP_TRACKS(id)
  }

  render () {
    const recents = [{id: 0, name: 'test0'}, {id: 1, name: 'test1'}, {id: 2, name: 'test2'}, {id: 3, name: 'test3'}]

    return (
      <div className="search-wrapper">
        <header>Mufly</header>
        <GithubLink />
        <h1>Discover new artists through an infinite suggestion graph.</h1>
        <h3>Enter the name of an artist you like:</h3>
        <SearchBox requestSearchSuggestions={::this.requestSearchSuggestions}
                   clearSearchInput={::this.clearSearchInput}
                   suggestions={this.formatSuggestions(this.props.suggestions)}
                   loading={this.props.loading}
                   confirmSelectSuggestion={::this.confirmSelectSuggestion}
        />
        <RecentSearch recents={recents}/>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    suggestions: state.suggestions,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer)
