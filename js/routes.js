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
  company: (Component) => Relay.QL`
    query PropertiesQueries {
      company {
        ${Component.getFragment('company')}
      }
    }
  `,
}
const BuildingQueries = {
  property: (Component) => Relay.QL`
    query BuildingQueries {
      node(id: $propertyId) {
        ${Component.getFragment('property')}
      }
    }
  `,
}
const UnitQueries = {
  building: (Component) => Relay.QL`
    query UnitQueries {
      node(id: $buildingId) {
        ${Component.getFragment('building')}
      }
    }
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
    <Route path=':propertyId/buildings/:buildingId'
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
