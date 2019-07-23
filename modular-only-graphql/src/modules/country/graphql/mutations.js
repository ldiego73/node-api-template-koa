import Service from '../service'

const service = new Service()

export default {
  async addCountry(_, args) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await service.insert(args)
    } catch (e) {
      /* istanbul ignore next */
      throw e
    }
  },
}
