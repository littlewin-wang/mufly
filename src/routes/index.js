import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import SearchContainer from 'containers/SearchContainer'
import NodeGraphContainer from 'containers/NodeGraphContainer'

const route = (
  <Router history={browserHistory}>
    <Route path='/'>
      <IndexRoute component={SearchContainer} />
      <Route path='artist(/:id)' component={NodeGraphContainer} />
    </Route>
  </Router>
)

export default route
