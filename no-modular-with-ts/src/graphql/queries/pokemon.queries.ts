import PokemonService from '../../services/pokemon.service'

const pokemonService = new PokemonService()

export default {
  async pokemones(_: any, { ids }: any) {
    return await pokemonService.searchByIds(ids.id)
  },

  async pokemon(_: any, { id }: any) {
    return await pokemonService.search(id)
  },
}
