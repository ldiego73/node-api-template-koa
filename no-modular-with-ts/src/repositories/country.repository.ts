import data from './data.json'
import { Country } from '../models/country.model'

export default class {
  async findAll(): Promise<Country[]> {
    return new Promise(resolve => resolve(data))
  }

  async findByIso(iso: string): Promise<Country> {
    return new Promise(resolve => {
      resolve(data.find(c => c.iso === iso))
    })
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  async insert(entity: object): Promise<boolean> {
    return true
  }
}
