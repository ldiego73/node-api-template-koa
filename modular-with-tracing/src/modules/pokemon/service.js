import { trace } from '../../tracing/decorators'
import { TracingTypes } from '../../tracing/index'
import axios from 'axios'

export default class {
  @trace({ type: TracingTypes.service })
  async search(ctx, id) {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    // eslint-disable-next-line camelcase
    const { name, base_experience, height, weight, sprites } = data
    const pokemon = {}

    pokemon.id = id
    pokemon.name = name
    // eslint-disable-next-line camelcase
    pokemon.base_experience = base_experience
    pokemon.height = height
    pokemon.weight = weight
    pokemon.images = {
      normal: sprites.front_default,
      shiny: sprites.front_shiny,
    }

    return pokemon
  }

  @trace({ type: TracingTypes.service })
  async searchByIds(ctx, ids) {
    const p = []

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      p.push(this.search(ctx, id))
    }

    return await Promise.all(p)
  }
}
