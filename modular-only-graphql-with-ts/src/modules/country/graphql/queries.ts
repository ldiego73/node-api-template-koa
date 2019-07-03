import Service from '../service'

const service = new Service()

export default {
  async countries(_: any, { orderBy }: any) {
    return await service.findAll(orderBy)
  },
  async country(_: any, { iso }: any) {
    return await service.findByIso(iso)
  },
}
