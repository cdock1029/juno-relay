import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  globalIdField,
} from 'graphql-relay'

import { nodeInterface } from './Node'
import Unit from './Unit'
import { TenantConnection } from './Tenant'

const Lease = new GraphQLObjectType({
  name: 'Lease',
  description: 'Lease of Tenant(s) for particular Unit',
  fields: () => ({
    id: globalIdField('Lease'),
    rent: { type: GraphQLInt, resolve: lease => lease.rent },
    startDate: { type: GraphQLString, resolve: l => l.startDate.toISOString() },
    endDate: { type: GraphQLString, resolve: l => l.endDate.toISOString() },
    nextRentDate: {
      type: GraphQLString, resolve: l => l.endDate.toISOString(),
    },
    unit: { type: Unit, resolve: lease => lease.getUnit() },
    tenants: {
      type: TenantConnection,
      args: connectionArgs,
      description: 'Tenants listed on the lease',
      resolve: (l, args) => connectionFromPromisedArray(
        l.getTenants({ order: [['lastName', 'ASC'], ['firstName', 'ASC']] }),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
})

export default Lease

export const {
  connectionType: LeaseConnection,
  edgeType: LeaseEdge,
} = connectionDefinitions({ name: 'Lease', nodeType: Lease })
