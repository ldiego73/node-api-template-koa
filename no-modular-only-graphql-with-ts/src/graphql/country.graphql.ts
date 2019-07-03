import fs from 'fs'
import path from 'path'
import { GraphQLModule } from '@graphql-modules/core'
import { gql } from 'apollo-server-koa'

import queries from '../queries/country.queries'
import mutations from '../mutations/country.mutations'

const graphql = fs.readFileSync(
  path.join(__dirname, '../schemas/country.gql'),
  'utf8'
)

export default new GraphQLModule({
  typeDefs: gql`
    ${graphql}
  `,
  resolvers: {
    Query: { ...queries },
    Mutation: { ...mutations },
  },
})
