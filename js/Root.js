import React from 'react'
import { browserHistory } from 'react-router'
import { RelayRouter } from 'react-router-relay'

import routes from './routes'

const Root = () => (
  <RelayRouter history={browserHistory}>
    {routes}
  </RelayRouter>
)

export default Root
