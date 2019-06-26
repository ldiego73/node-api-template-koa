import PokemonService from "../service"

const pokemonService = new PokemonService()

export default {
  async pokemon(_, { id }) {
    return await pokemonService.search(id)
  },
}
