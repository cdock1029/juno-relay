import { GraphQLSchema } from 'graphql'
import { RootQuery } from './queries'
import { RootMutation } from './mutations'

// const debug = require('debug')('cdock:schema')

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})
