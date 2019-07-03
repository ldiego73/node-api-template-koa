import Service from '../service'

const service = new Service()

export default {
  async countries(_, { orderBy }) {
    return await service.findAll(orderBy)
  },
  async country(_, { iso }) {
    return await service.findByIso(iso)
  },
}
