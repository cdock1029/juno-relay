import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
} from 'graphql'

import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay'
import { PropertyModel, CompanyModel } from '../db'
import { Property, Company } from '../types'

const CreatePropertyMutation = mutationWithClientMutationId({
  name: 'CreatePropertyMutation',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    state: { type: new GraphQLNonNull(GraphQLString) },
    zip: { type: new GraphQLNonNull(GraphQLString) },
    companyId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    company: {
      type: Company,
      resolve: payload => payload.company.get({ plain: true }),
    },
    property: {
      type: Property,
      resolve: payload => payload.property.get({ plain: true }),
    },
  },
  // TODO: fix this, error handling, use correct Model methods, etc.
  mutateAndGetPayload: async (input) => {
    const { id: companyId } = fromGlobalId(input.companyId)
    // TODO: make this a transaction ???
    const company = await CompanyModel.findById(companyId)
    const property = await PropertyModel.create(
      { ...input, companyId },
      { fields: ['name', 'city', 'street', 'state', 'zip', 'companyId'] }
    )
    return { company, property }
  },
})

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
export const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    createPropertyMutation: CreatePropertyMutation,
  }),
})
