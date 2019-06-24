import fs from "fs"
import path from "path"
import { GraphQLModule } from "@graphql-modules/core"
import { gql } from "apollo-server-koa"

import queries from "./country.queries"
import mutations from "./country.mutations"

const graphql = fs.readFileSync(path.join(__dirname, `country.gql`), `utf8`)

export default new GraphQLModule({
  typeDefs: gql`
    ${graphql}
  `,
  resolvers: {
    Query: { ...queries },
    Mutation: { ...mutations },
  },
})
