import PokemonService from "./service"

const service = new PokemonService()

export default class {
  async findById(ctx) {
    const id = ctx.params.id
    const response = await service.search(id)

    ctx.body = response
  }
}
