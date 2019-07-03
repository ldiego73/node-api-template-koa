import Service from '../service'

const service = new Service()

export default {
  async addCountry(_: any, args: any) {
    return await service.insert(args)
  },
}
