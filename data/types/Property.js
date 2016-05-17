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
import { BuildingConnection } from './Building'

const Property = new GraphQLObjectType({
  name: 'Property',
  description: 'A main location where tenants live',
  fields: () => ({
    id: globalIdField('Property'),
    name: {
      type: GraphQLString,
      resolve: property => property.name,
    },
    city: {
      type: GraphQLString,
      resolve: property => property.city,
    },
    street: {
      type: GraphQLString,
      resolve: property => property.street,
    },
    state: {
      type: GraphQLString,
      resolve: property => property.state,
    },
    zip: {
      type: GraphQLString,
      resolve: property => property.zip,
    },
    buildings: {
      type: BuildingConnection,
      args: connectionArgs,
      resolve: (property, args) => connectionFromPromisedArray(
        property.getBuildings({ order: [['address', 'ASC']] }),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
})

export default Property

export const {
  connectionType: PropertyConnection,
  edgeType: PropertyEdge,
} = connectionDefinitions({ name: 'Property', nodeType: Property })
