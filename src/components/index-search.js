require('normalize.css/normalize.css')
require('styles/App.css')

import React from 'react'
import API from '../api'

import GithubLink from './githubLink'
import Footer from './footer'

export default class AppComponent extends React.Component {
  componentDidMount() {
    API.releatedArtists('2elBjNSdBE2Y3f0j1mjrql').then(res => {
      if (res.statusText === 'OK') {
        console.log(res.data)
      }
    })
  }

  render() {
    return (
      <div className="index">
        <GithubLink />
        <Footer />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};
