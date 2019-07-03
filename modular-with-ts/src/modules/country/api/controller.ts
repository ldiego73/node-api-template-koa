/* eslint require-atomic-updates: 0 */

import { BaseContext } from 'koa'
import Service from '../service'

const service = new Service()

export default class {
  async list(ctx: BaseContext): Promise<any> {
    ctx.body = await service.findAll()
  }

  async findByIso(ctx: BaseContext): Promise<any> {
    const iso = ctx.params.iso
    const result = await service.findByIso(iso)

    if (result) {
      ctx.body = result
    } else {
      ctx.throw(400, `Country ${iso} not found`)
    }
  }
}
