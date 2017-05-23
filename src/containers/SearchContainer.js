import React  from 'react'
import { SearchBox, RecentSearch, GithubLink, Footer } from 'components'

export default class SearchContainer extends React.Component {
  render () {
    const recents = [{id: 0, name: 'test0'}, {id: 1, name: 'test1'}, {id: 2, name: 'test2'}, {id: 3, name: 'test3'}]

    return (
      <div className="search-wrapper">
        <header>Mufly</header>
        <GithubLink />
        <h1>Discover new artists through an infinite suggestion graph.</h1>
        <h3>Enter the name of an artist you like:</h3>
        <SearchBox />
        <RecentSearch recents={recents}/>
        <Footer />
      </div>
    )
  }
}
