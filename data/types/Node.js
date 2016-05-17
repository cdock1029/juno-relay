import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay'
import db from '../db'
import {
  Unit,
  Building,
  Property,
  Company,
  Lease,
  Tenant,
} from './index'
const debug = require('debug')('cdock:schema')

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
export const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId)
    return db.models[type.toLowerCase()].findById(id)
  },
  (obj) => {
    // debug('nodeDefinitions\n', JSON.stringify(obj, null, 2))
    switch (obj.type) {
      case 'Unit':
        return Unit
      case 'Building':
        return Building
      case 'Property':
        return Property
      case 'Company':
        return Company
      case 'Lease':
        return Lease
      case 'Tenant':
        return Tenant
      default:
        debug(`Unknown object type: ${obj.type}`)
        return null
    }
  }
)
