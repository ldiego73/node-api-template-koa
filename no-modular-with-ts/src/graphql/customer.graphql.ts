import fs from 'fs'
import path from 'path'
import { GraphQLModule } from '@graphql-modules/core'
import { gql } from 'apollo-server-koa'

import { queries, customer, order } from './queries/cutomer.queries'

const graphql = fs.readFileSync(
  path.join(__dirname, './gql/customer.gql'),
  'utf8'
)

export default new GraphQLModule({
  typeDefs: gql`
    ${graphql}
  `,
  resolvers: {
    Query: { ...queries },
    Customer: { ...customer },
    Order: { ...order },
  },
})
