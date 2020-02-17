import { trace } from '../../tracing/decorators'
import { TracingTypes } from '../../tracing/index'
import Repository from './repository'
import Model from './model'

const repository = new Repository()

export default class {
  @trace({ type: TracingTypes.service })
  async findAll(ctx, orderBy) {
    const data = await repository.findAll(ctx)

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

  @trace({ type: TracingTypes.service })
  async findAllV2(ctx) {
    return await repository.findAllV2(ctx)
  }

  @trace({ type: TracingTypes.service })
  async findByIso(ctx, iso) {
    const data = await repository.findByIso(ctx, iso)
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

  @trace({ type: TracingTypes.service })
  async insert(ctx, args) {
    return await repository.insert(ctx, args)
  }
}
