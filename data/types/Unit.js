import {
  GraphQLObjectType,
  GraphQLInt,
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  globalIdField,
} from 'graphql-relay'

import { nodeInterface } from './Node'
import Building from './Building'
import { LeaseConnection } from './Lease'

const Unit = new GraphQLObjectType({
  name: 'Unit',
  description: 'Individual Apartments / Units within a building',
  fields: () => ({
    id: globalIdField('Unit'),
    number: { type: GraphQLInt, resolve: unit => unit.number },
    building: {
      description: 'The building to which this unit belongs',
      type: Building,
      resolve: unit => unit.getBuilding(),
    },
    leases: {
      type: LeaseConnection,
      args: connectionArgs,
      description: 'Leases associated with this unit',
      resolve: (unit, args) => connectionFromPromisedArray(
        unit.getLeases({ order: [['startDate', 'DESC']] }),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
})

export default Unit

export const {
  connectionType: UnitConnection,
  edgeType: UnitEdge,
} = connectionDefinitions({ name: 'Unit', nodeType: Unit })
