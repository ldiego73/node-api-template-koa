import axios from 'axios'
import { Pokemon } from './model'

export default class {
  async search(id: number): Promise<Pokemon> {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    /* eslint-disable-next-line @typescript-eslint/camelcase */
    const { name, base_experience, height, weight, sprites } = data

    return {
      id,
      name,
      /* eslint-disable-next-line @typescript-eslint/camelcase */
      base_experience,
      height,
      weight,
      images: {
        normal: sprites.front_default,
        shiny: sprites.front_shiny,
      },
    }
  }

  async searchByIds(ids: [number]): Promise<Pokemon[]> {
    const p: Promise<Pokemon>[] = []

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      p.push(this.search(id))
    }

    return await Promise.all(p)
  }
}
