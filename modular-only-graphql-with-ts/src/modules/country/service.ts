import Repository from './repository'
import { Country } from './model'

const repository = new Repository()

export default class {
  async findAll(orderBy?: string): Promise<Country[]> {
    const data = await repository.findAll()

    if (!orderBy) {
      return data
    }

    let sortData: Country[]

    if (orderBy === 'iso_DESC') {
      sortData = data.sort((a, b) => {
        if (a.iso > b.iso) {
          return -1
        } else if (a.iso < b.iso) {
          return 1
        }
        /* istanbul ignore next */
        return 0
      })
    } else if (orderBy === 'iso_ASC') {
      sortData = data.sort((a, b) => {
        if (a.iso < b.iso) {
          return -1
        } else if (a.iso > b.iso) {
          return 1
        }
        /* istanbul ignore next */
        return 0
      })
    } else if (orderBy === 'name_DESC') {
      sortData = data.sort((a, b) => {
        if (a.name > b.name) {
          return -1
        } else if (a.name < b.name) {
          return 1
        }
        /* istanbul ignore next */
        return 0
      })
    } else if (orderBy === 'name_ASC') {
      sortData = data.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        } else if (a.name > b.name) {
          return 1
        }
        /* istanbul ignore next */
        return 0
      })
    } else {
      /* istanbul ignore next */
      sortData = data
    }

    return sortData
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
