import React from 'react'

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
  Dashboard,
} from './containers'

const PropertyQueries = {
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

const Root = () => (
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}>
    <Route
      queries={PropertyQueries}
      component={Dashboard}>
      <Route
        path='/'
        components={{ propertyComponent: PropertyListContainer }}
        queries={{ propertyComponent: PropertyQueries }} />
      <Route
        path='/:propertyId/buildings'
        components={{
          propertyComponent: PropertyListContainer,
          buildingComponent: BuildingListContainer,
        }}
        queries={{
          propertyComponent: PropertyQueries,
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
          propertyComponent: PropertyQueries,
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
          propertyComponent: PropertyQueries,
          buildingComponent: BuildingQueries,
          unitComponent: UnitQueries,
          unitDetailComponent: UnitDetailQueries,
        }} />
    </Route>
    <Route path='/create-property' component={CreatePropertyComponent} />
    <Route path='*' component={NotFound} />
  </Router>
)

export default Root
