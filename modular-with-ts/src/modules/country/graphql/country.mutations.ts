import CountryService from "../country.service"

const service = new CountryService()

export default {
  async addCountry(_: any, args: any) {
    try {
      return await service.insert(args)
    } catch (e) {
      /* istanbul ignore next */
      throw e
    }
  },
}
