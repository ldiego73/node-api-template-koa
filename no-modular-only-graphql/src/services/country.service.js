import CountryRepository from '../repositories/country.repository'
import CountryModel from '../models/country.model'

const repository = new CountryRepository()

export default class {
  async findAll(orderBy) {
    const data = await repository.findAll()

    if (!orderBy) {
      return data
    }

    let sortData = []

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

  async findByIso(iso) {
    const data = await repository.findByIso(iso)
    const keys = Object.keys(data || {}).length

    if (keys < 1) return null

    return new CountryModel(
      data.name,
      data.iso,
      data.brand_id,
      data.currency,
      data.status
    )
  }

  async insert() {
    return await repository.insert()
  }
}
