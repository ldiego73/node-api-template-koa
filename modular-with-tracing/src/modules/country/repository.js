import { trace } from '../../tracing/decorators'
import { TracingTypes } from '../../tracing/index'
import countriesV1 from './data/v1/countries.json'
import countriesV2 from './data/v2/countries.json'

export default class {
  @trace({ type: TracingTypes.repository })
  async findAll(ctx) {
    return new Promise(resolve => resolve(countriesV1))
  }

  @trace({ type: TracingTypes.repository })
  async findAllV2(ctx) {
    return new Promise(resolve => resolve(countriesV2))
  }

  @trace({ type: TracingTypes.repository })
  async findByIso(ctx, iso) {
    return new Promise(resolve => {
      resolve(countriesV1.find(c => c.iso === iso))
    })
  }

  @trace({ type: TracingTypes.repository })
  async insert(ctx, entity) {
    return true
  }
}
