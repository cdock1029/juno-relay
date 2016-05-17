import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  globalIdField,
} from 'graphql-relay'

import { nodeInterface } from './Node'
import Property from './Property'
import { UnitConnection } from './Unit'

const Building = new GraphQLObjectType({
  name: 'Building',
  description: 'A building within a property. Properties can have several',
  fields: () => ({
    id: globalIdField('Building'),
    address: {
      type: GraphQLString,
      resolve: building => building.address,
    },
    property: {
      type: Property,
      resolve: building => building.getProperty(),
    },
    units: {
      type: UnitConnection,
      args: connectionArgs,
      resolve: (building, args) => connectionFromPromisedArray(
        building.getUnits({ order: [['number', 'ASC']] }),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
})

export default Building

export const {
  connectionType: BuildingConnection,
  edgeType: BuildingEdge,
} = connectionDefinitions({ name: 'Building', nodeType: Building })
