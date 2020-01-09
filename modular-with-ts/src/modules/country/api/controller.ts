/* eslint require-atomic-updates: 0 */

import { RouterContext } from 'koa-router'
import Service from '../service'

const service = new Service()

export default class {
  async list(ctx: RouterContext): Promise<any> {
    ctx.body = await service.findAll()
  }

  async listV2(ctx: RouterContext): Promise<any> {
    ctx.body = await service.findAllV2()
  }

  async findByIso(ctx: RouterContext): Promise<any> {
    const iso = ctx.params.iso
    const result = await service.findByIso(iso)

    if (result) {
      ctx.body = result
    } else {
      ctx.throw(400, `Country ${iso} not found`)
    }
  }
}
