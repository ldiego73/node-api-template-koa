import PokemonService from "../pokemon.service"

const pokemonService = new PokemonService()

export default {
  async pokemon(_: any, { id }: any) {
    return await pokemonService.search(id)
  },
}
