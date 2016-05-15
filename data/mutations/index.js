import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql'

import { mutationWithClientMutationId } from 'graphql-relay'
import { PropertyModel } from '../db'
import { Property } from '../types'

const CreatePropertyMutation = mutationWithClientMutationId({
  name: 'CreateProperty',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    state: { type: new GraphQLNonNull(GraphQLString) },
    zip: { type: new GraphQLNonNull(GraphQLString) },
    companyId: { type: new GraphQLNonNull(GraphQLInt) },
  },
  outputFields: {
    property: {
      type: Property,
      resolve: prop => prop.get({ plain: true }),
    },
  },
  // TODO: fix this, error handling, use correct Model methods, etc.
  mutateAndGetPayload: async (input) => await PropertyModel.create(
    input,
    { fields: ['name', 'city', 'street', 'state', 'zip', 'companyId'] }
  ),
})

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
export const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    createProperty: CreatePropertyMutation,
  }),
})
