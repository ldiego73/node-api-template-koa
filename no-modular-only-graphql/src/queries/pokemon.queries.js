import PokemonService from '../services/pokemon.service'

const pokemonService = new PokemonService()

export default {
  async pokemones(_, { ids }) {
    return await pokemonService.searchByIds(ids.id)
  },

  async pokemon(_, { id }) {
    return await pokemonService.search(id)
  },
}
