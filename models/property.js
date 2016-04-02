import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql'

import Building from './building'

const Property = new GraphQLObjectType({
  name: 'Property',
  description: 'A main location where tenants live',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: property => property.id,
    },
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
      type: new GraphQLList(Building),
      resolve: property => property.getBuildings(),
    },
  }),
})

export default Property
