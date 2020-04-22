import Service from '../service'
import PokemonNotFoundError from '../errors/pokemon.not-found.error'

const service = new Service()

export default {
  async pokemones(_, { ids }) {
    const notFound = ids.id.includes(1000)

    if (notFound)
      throw new PokemonNotFoundError('Pokemon not found asa')

    return await service.searchByIds(ids.id)
  },

  async pokemon(_, { id }) {
    return await service.search(id)
  },
}
