/* eslint require-atomic-updates: 0 */
import { trace } from '../../../tracing/decorators'

import Service from '../service'

const service = new Service()

export default class {
  @trace()
  async list(ctx) {
    ctx.body = await service.findAll(ctx)
  }

  @trace()
  async listV2(ctx) {
    ctx.body = await service.findAllV2(ctx)
  }

  @trace()
  async findByIso(ctx) {
    const iso = ctx.params.iso
    const result = await service.findByIso(ctx, iso)

    if (result) {
      ctx.body = result
    } else {
      ctx.throw(400, `Country ${iso} not found`)
    }
  }
}
