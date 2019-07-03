import fs from 'fs'
import path from 'path'
import { GraphQLModule } from '@graphql-modules/core'
import { gql } from 'apollo-server-koa'

import queries from './queries'

const graphql = fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf8')

export default new GraphQLModule({
  typeDefs: gql`
    ${graphql}
  `,
  resolvers: {
    Query: { ...queries },
  },
})
