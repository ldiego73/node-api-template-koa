import { traceGraphQL } from '../../../tracing/decorators'
import Service from '../service'

const service = new Service()

class Queries {
  @traceGraphQL()
  async countries(_, __, ctx) {
    return await service.findAll(ctx)
  }

  @traceGraphQL()
  async country(_, { iso }, ctx) {
    return await service.findByIso(ctx, iso)
  }
}

const q = new Queries()

export default {
  countries: q.countries,
  country: q.country,
}
