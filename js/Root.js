import React from 'react'

import {
  Router,
  Route,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router'
import useRelay from 'react-router-relay'

import Heading from './components/Heading'
import Relay from 'react-relay'

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

const Root = () => (
  <div className='ui container'>
    <Heading />
    <Router
      history={browserHistory}
      render={applyRouterMiddleware(useRelay)}
      environment={Relay.Store}>
      <Route
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
      </Route>
      <Route key='route2' path='*' component={NotFound} />
    </Router>
  </div>
)

export default Root
