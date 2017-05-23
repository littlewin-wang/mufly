import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import SearchContainer from 'components/containers/SearchContainer'
import NodeGraphContainer from 'components/containers/NodeGraphContainer'

const route = (
  <Router history={browserHistory}>
    <Route path='/' component={SearchContainer}>
      <Route path='artist/:id' component={NodeGraphContainer} />
    </Route>
  </Router>
)

export default route
