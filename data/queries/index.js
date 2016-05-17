import {
  /* GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType, */
  GraphQLObjectType,
} from 'graphql'

import {
  nodeField,
  Company,
 } from '../types'

import db from '../db'

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
export const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    company: {
      type: Company,
      resolve() {
        return db.models.company.findOne({
          where: { name: 'Vandelay Industries' },
        })
      },
    },
    // TODO: Do I even need these other queries?
    /* properties: {
      type: PropertyConnection,
      args: {
        ...connectionArgs,
        where: {
          type: new GraphQLInputObjectType({
            name: 'PropertiesWhere',
            fields: {
              name: { type: GraphQLString },
            },
          }),
        },
      },
      resolve(_, args) {
        return connectionFromPromisedArray(
          db.models.property.findAll({
            order: [['name', 'ASC']],
            where: args.where,
          }),
          args
        )
      },
    },
    buildings: {
      type: BuildingConnection,
      args: connectionArgs,
      resolve(_, args) {
        return connectionFromPromisedArray(
          db.models.building.findAll({
            order: [['address', 'ASC']],
          }),
          args
        )
      },
    },
    units: {
      type: UnitConnection,
      args: connectionArgs,
      resolve(_, args) {
        return connectionFromPromisedArray(
          db.models.unit.findAll({
            order: [['number', 'ASC']],
          }),
          args
        )
      },
    },
    tenants: {
      type: TenantConnection,
      args: {
        ...connectionArgs,
        firstName: { type: GraphQLString },
        middleName: { type: GraphQLString },
        lastName: { type: GraphQLString },
      },
      resolve: (_, args) => {
        const { firstName, middleName, lastName } = args
        const where = {}
        if (firstName) where.firstName = firstName
        if (middleName) where.middleName = middleName
        if (lastName) where.lastName = lastName
        return connectionFromPromisedArray(
          db.models.tenant.findAll({ where }),
          args
        )
      },
    }, */
  }),
})
