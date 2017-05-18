require('normalize.css/normalize.css')
require('styles/base.css')

import React from 'react'
import API from '../../helpers/api'

import GithubLink from '../GithubLink/GithubLink'
import Footer from '../Footer/Footer'

export default class IndexSearch extends React.Component {
  componentDidMount () {
    API.releatedArtists('2elBjNSdBE2Y3f0j1mjrql').then(res => {
      if (res.statusText === 'OK') {
        console.log(res.data)
      }
    })
  }

  render () {
    return (
      <div className="index">
        <GithubLink />
        <Footer />
      </div>
    )
  }
}

IndexSearch.defaultProps = {
}
