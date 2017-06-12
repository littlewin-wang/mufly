import React  from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

import { browserHistory } from 'react-router'

import { SearchBox, RecentSearch, GithubLink, Footer, Modal } from 'components'

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
    const MAX_NUM = 8
    if (arr) {
      let retArr = []
      let len = arr.length > MAX_NUM ? MAX_NUM : arr.length

      for (let i = 0; i < len; i++) {
        let suggestion = {
          id: arr[i].id,
          name: arr[i].name
        }
        retArr.push(suggestion)
      }

      return retArr
    } else {
      return []
    }
  }

  confirmSelectSuggestion (id) {
    browserHistory.push(`artist/${id}`)
    this.props.actions.CLEAR_SEARCH_RESULTS()
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
                   readOnly={this.props.requesting}
        />
        <RecentSearch recents={recents}/>
        <Footer />
        { this.props.requesting &&
          <Modal />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    suggestions: state.suggestions,
    loading: state.loading,
    requesting: state.requesting
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
