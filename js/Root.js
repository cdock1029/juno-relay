import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { Provider } from 'react-redux'

import {
  Router,
  Route,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router'
import useRelay from 'react-router-relay'

import Relay from 'react-relay'

import {
  PropertyListContainer,
  BuildingListContainer,
  UnitListContainer,
  UnitDetailContainer,
  NotFound,
  CreatePropertyComponent,
} from './components'

import {
  Container,
  Dashboard,
} from './containers'

const CompanyQuery = {
  company: () => Relay.QL`
    query PropertiesQueries { company }
  `,
}
const BuildingQueries = {
  property: () => Relay.QL`
    query BuildingQueries { node(id: $propertyId) }
  `,
}
const UnitQueries = {
  building: () => Relay.QL`
    query UnitQueries { node(id: $buildingId) }
  `,
}
const UnitDetailQueries = {
  unit: () => Relay.QL`
    query UnitDetailQueries { node(id: $unitId) }
  `,
}

const reducers = {
  form: formReducer,
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

const Root = () => (
  <Provider store={store}>
    <Router
      history={browserHistory}
      render={applyRouterMiddleware(useRelay)}
      environment={Relay.Store}>
      <Route component={Container}>
        <Route
          queries={CompanyQuery}
          component={Dashboard}>
          <Route
            path='/'
            components={{ propertyComponent: PropertyListContainer }}
            queries={{ propertyComponent: CompanyQuery }} />
          <Route
            path='/:propertyId/buildings'
            components={{
              propertyComponent: PropertyListContainer,
              buildingComponent: BuildingListContainer,
            }}
            queries={{
              propertyComponent: CompanyQuery,
              buildingComponent: BuildingQueries,
            }} />
          <Route
            path='/:propertyId/buildings/:buildingId/units'
            components={{
              propertyComponent: PropertyListContainer,
              buildingComponent: BuildingListContainer,
              unitComponent: UnitListContainer,
            }}
            queries={{
              propertyComponent: CompanyQuery,
              buildingComponent: BuildingQueries,
              unitComponent: UnitQueries }} />
          <Route
            path='/:propertyId/buildings/:buildingId/units/:unitId'
            components={{
              propertyComponent: PropertyListContainer,
              buildingComponent: BuildingListContainer,
              unitComponent: UnitListContainer,
              unitDetailComponent: UnitDetailContainer,
            }}
            queries={{
              propertyComponent: CompanyQuery,
              buildingComponent: BuildingQueries,
              unitComponent: UnitQueries,
              unitDetailComponent: UnitDetailQueries,
            }} />
        </Route>
        <Route
          path='/create-property'
          component={CreatePropertyComponent}
          queries={CompanyQuery} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>
)

export default Root
