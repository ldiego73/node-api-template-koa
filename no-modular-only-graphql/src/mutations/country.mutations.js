import CountryService from '../services/country.service'

const service = new CountryService()

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
