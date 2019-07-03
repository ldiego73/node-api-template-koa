import Service from '../service'

const service = new Service()

export default {
  async pokemones(_, { ids }) {
    return await service.searchByIds(ids.id)
  },

  async pokemon(_, { id }) {
    return await service.search(id)
  },
}
