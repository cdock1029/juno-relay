import React from 'react'
import Relay from 'react-relay'

import { Route } from 'react-router'

import {
  BuildingListContainer,
  UnitListContainer,
  NotFound,
} from './components'

import {
  AppContainer,
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
const routes = [
  (<Route
    key='route1'
    path='/'
    component={AppContainer}
    queries={PropertyQueries}>
    <Route
      path=':propertyId/buildings'
      components={{ buildingComponent: BuildingListContainer }}
      queries={{ buildingComponent: BuildingQueries }} />
    <Route path=':propertyId/buildings/:buildingId/units'
      components={{
        buildingComponent: BuildingListContainer,
        unitComponent: UnitListContainer,
      }}
      queries={{
        buildingComponent: BuildingQueries,
        unitComponent: UnitQueries }} />
  </Route>),
  <Route key='route2' path='*' component={NotFound} />,
]

export default routes
