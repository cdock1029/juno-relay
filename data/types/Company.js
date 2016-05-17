import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import {
  connectionArgs,
  connectionFromPromisedArray,
  globalIdField,
} from 'graphql-relay'

import { nodeInterface } from './Node'
import { PropertyConnection } from './Property'

const Company = new GraphQLObjectType({
  name: 'Company',
  description: 'Parent company (user) of application',
  fields: () => ({
    id: globalIdField('Company'),
    name: {
      type: GraphQLString,
      resolve: company => company.name,
    },
    properties: {
      type: PropertyConnection,
      args: connectionArgs,
      resolve: (company, args) => connectionFromPromisedArray(
        company.getProperties({ order: [['name', 'ASC']] }),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
})

export default Company
