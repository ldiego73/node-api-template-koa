import Service from '../service'

const service = new Service()

export default {
  async pokemones(_: any, { ids }: any) {
    return await service.searchByIds(ids.id)
  },

  async pokemon(_: any, { id }: any) {
    return await service.search(id)
  },
}
