import React from 'react'
import { browserHistory } from 'react-router'
import { RelayRouter } from 'react-router-relay'
import Heading from './components/heading'

import routes from './routes'

const Root = () => (
  <div className='ui container'>
    <Heading />
    <RelayRouter history={browserHistory}>
      {routes}
    </RelayRouter>
  </div>
)

export default Root
