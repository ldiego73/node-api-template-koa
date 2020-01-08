/* eslint require-atomic-updates: 0 */

import { RouterContext } from 'koa-router'
import PokemonService from '../services/pokemon.service'

const service = new PokemonService()

export default class {
  async findById(ctx: RouterContext): Promise<any> {
    const id = ctx.params.id
    const response = await service.search(id)

    ctx.body = response
  }
}
