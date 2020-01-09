import CountryRepository from '../repositories/country.repository'
import { Country } from '../models/country.model'

const repository = new CountryRepository()

export default class {
  async findAll(orderBy?: string): Promise<Country[]> {
    const data = await repository.findAll()

    if (!orderBy) {
      return data
    }

    let sortData: Country[]

    if (orderBy === 'iso_DESC') {
      sortData = data.sort((a, b) => {
        return a.iso < b.iso ? 1 : -1
      })
    } else if (orderBy === 'iso_ASC') {
      sortData = data.sort((a, b) => {
        return a.iso > b.iso ? 1 : -1
      })
    } else if (orderBy === 'name_DESC') {
      sortData = data.sort((a, b) => {
        return a.name < b.name ? 1 : -1
      })
    } else if (orderBy === 'name_ASC') {
      sortData = data.sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })
    } else {
      /* istanbul ignore next */
      sortData = data
    }

    return sortData
  }

  async findAllV2(): Promise<Country[]> {
    return await repository.findAllV2()
  }

  async findByIso(iso: string): Promise<Country> {
    const data = await repository.findByIso(iso)
    const keys = Object.keys(data || {}).length

    if (keys < 1) return null

    return data
  }

  async insert(entity?: object): Promise<boolean> {
    return await repository.insert(entity)
  }
}
