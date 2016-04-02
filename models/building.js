import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql'

import Property from './property'

const Building = new GraphQLObjectType({
  name: 'Building',
  description: 'A building within a property. Properties can have several',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: building => building.id,
    },
    address: {
      type: GraphQLString,
      resolve: building => building.address,
    },
    property: {
      type: Property,
      resolve: building => building.getProperty(),
    },
  }),
})

export default Building
