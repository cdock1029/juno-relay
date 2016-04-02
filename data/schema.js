import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay'

import db from './db'
const debug = require('debug')('cdock:schema')
/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId)
    return db.models[type.toLowerCase()].findById(id)
  },
  (obj) => {
    debug('nodeDefinitions\n', JSON.stringify(obj, null, 2))
    switch (obj.type) {
      case 'Unit':
        return Unit
      case 'Building':
        return Building
      case 'Property':
        return Property
      case 'Company':
        return Company
      default:
        debug(`Unknown object type: ${obj.type}`)
        return null
    }
  }
)

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

const Building = new GraphQLObjectType({
  name: 'Building',
  description: 'A building within a property. Properties can have several',
  fields: () => ({
    id: globalIdField('Building'),
    address: {
      type: GraphQLString,
      resolve: building => building.address,
    },
    property: {
      type: Property,
      resolve: building => building.getProperty(),
    },
    units: {
      type: UnitConnection,
      args: connectionArgs,
      resolve: (building, args) => connectionFromPromisedArray(
        building.getUnits({ order: [['number', 'ASC']] }),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
})

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

const Unit = new GraphQLObjectType({
  name: 'Unit',
  description: 'Individual Apartments / Units within a building',
  fields: () => ({
    id: globalIdField('Unit'),
    number: {
      type: GraphQLInt,
      resolve: unit => unit.number,
    },
    building: {
      description: 'The building to which this unit belongs',
      type: Building,
      resolve: unit => unit.getBuilding(),
    },
  }),
  interfaces: [nodeInterface],
})


/**
 * Define your own connection types here
 */
const { connectionType: BuildingConnection } = connectionDefinitions(
  { name: 'Building', nodeType: Building }
)
const { connectionType: PropertyConnection } = connectionDefinitions(
  { name: 'Property', nodeType: Property }
)
const { connectionType: UnitConnection } = connectionDefinitions(
  { name: 'Unit', nodeType: Unit }
)

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
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
    properties: {
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
  }),
})

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add your own mutations here
  }),
})

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  // mutation: mutationType
})
