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
import { LeaseConnection } from './Lease'

const Tenant = new GraphQLObjectType({
  name: 'Tenant',
  description: 'Person renting Unit',
  fields: () => ({
    id: globalIdField('Tenant'),
    firstName: { type: GraphQLString, resolve: t => t.firstName },
    middleName: { type: GraphQLString, resolve: t => t.middleName },
    lastName: { type: GraphQLString, resolve: t => t.lastName },
    fullName: { type: GraphQLString, resolve: t => t.fullName },
    leases: {
      type: LeaseConnection,
      args: connectionArgs,
      description: 'Leases that this tenant has been a part of',
      resolve: (tenant, args) => connectionFromPromisedArray(
        tenant.getLeases({ order: [['startDate', 'DESC']] }),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
})

export default Tenant

export const {
  connectionType: TenantConnection,
  edgeType: TenantEdge,
} = connectionDefinitions({ name: 'Tenant', nodeType: Tenant })
