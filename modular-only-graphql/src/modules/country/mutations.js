import Service from './service'

const service = new Service()

export default {
  async addCountry(_, args) {
    try {
      return await service.insert(args)
    } catch (e) {
      /* istanbul ignore next */
      throw e
    }
  },
}
