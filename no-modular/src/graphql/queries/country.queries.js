import CountryService from '../../services/country.service'

const service = new CountryService()

export default {
  async countries(_, { orderBy }) {
    return await service.findAll(orderBy)
  },
  async country(_, { iso }) {
    return await service.findByIso(iso)
  },
}
