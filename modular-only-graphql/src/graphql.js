import { GraphQLModule } from '@graphql-modules/core'
import country from './modules/country'
import pokemon from './modules/pokemon'

export default new GraphQLModule({
  imports: [country, pokemon],
})
