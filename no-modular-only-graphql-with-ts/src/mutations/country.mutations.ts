import CountryService from '../services/country.service'

const service = new CountryService()

export default {
  async addCountry(_: any, args: any) {
    return await service.insert(args)
  },
}
