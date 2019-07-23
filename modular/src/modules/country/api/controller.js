/* eslint require-atomic-updates: 0 */

import Service from '../service'

const service = new Service()

export default class {
  async list(ctx) {
    ctx.body = await service.findAll()
  }

  async findByIso(ctx) {
    const iso = ctx.params.iso
    const result = await service.findByIso(iso)

    if (result) {
      ctx.body = result
    } else {
      ctx.throw(400, `Country ${iso} not found`)
    }
  }
}
