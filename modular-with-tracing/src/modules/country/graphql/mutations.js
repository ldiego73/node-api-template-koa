import Service from '../service'

const service = new Service()

class Mutations {
  async addCountry(_, args, ctx) {
    // eslint-disable-next-line
    try {
      return await service.insert(ctx, args)
    } catch (e) {
      /* istanbul ignore next */
      throw e
    }
  }
}

const m = new Mutations()

export default {
  addCountry: m.addCountry,
}
