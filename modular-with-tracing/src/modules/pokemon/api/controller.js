/* eslint require-atomic-updates: 0 */
import { trace } from '../../../tracing/decorators'
import Service from '../service'

const service = new Service()

export default class {
  @trace()
  async findById(ctx) {
    const id = ctx.params.id
    const response = await service.search(ctx, id)

    ctx.body = response
  }
}
