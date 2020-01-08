import { GraphQLModule } from '@graphql-modules/core'
import country from './graphql/country.graphql'
import pokemon from './graphql/pokemon.graphql'
import customer from './graphql/customer.graphql'

export default new GraphQLModule({
  imports: [country, pokemon, customer],
})
