import Repository from './repository'
import Model from './model'

const repository = new Repository()

export default class {
  async findAll(orderBy) {
    const data = await repository.findAll()

    if (!orderBy) {
      return data
    }

    let sortData = []

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

  async findAllV2() {
    return await repository.findAllV2()
  }

  async findByIso(iso) {
    const data = await repository.findByIso(iso)
    const keys = Object.keys(data || {}).length

    if (keys < 1) return null

    return new Model(
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
