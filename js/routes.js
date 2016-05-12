import React from 'react'
import Relay from 'react-relay'

import { Route } from 'react-router'

import {
  PropertyListContainer,
  BuildingListContainer,
  UnitListContainer,
  UnitDetailContainer,
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
const UnitDetailQueries = {
  unit: () => Relay.QL`
    query UnitDetailQueries { node(id: $unitId) }
  `,
}
const routes = [
  (<Route
    key='route1'
    queries={PropertyQueries}
    component={AppContainer}>
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
  </Route>),
  <Route key='route2' path='*' component={NotFound} />,
]

export default routes
