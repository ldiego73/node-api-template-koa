import CountryService from '../services/country.service'

const service = new CountryService()

export default {
  async countries(_: any, { orderBy }: any) {
    return await service.findAll(orderBy)
  },
  async country(_: any, { iso }: any) {
    return await service.findByIso(iso)
  },
}
