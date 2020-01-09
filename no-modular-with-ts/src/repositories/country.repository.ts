import countriesV1 from '../data/v1/countries.json'
import countriesV2 from '../data/v2/countries.json'

import { Country } from '../models/country.model'

export default class {
  async findAll(): Promise<Country[]> {
    return new Promise(resolve => resolve(countriesV1))
  }

  async findAllV2(): Promise<Country[]> {
    return new Promise(resolve => resolve(countriesV2))
  }

  async findByIso(iso: string): Promise<Country> {
    return new Promise(resolve => {
      resolve(countriesV1.find(c => c.iso === iso))
    })
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  async insert(entity: object): Promise<boolean> {
    return true
  }
}
