require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import API from '../api'

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
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
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
