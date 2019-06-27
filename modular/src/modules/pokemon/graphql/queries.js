import Service from "../service"

const service = new Service()

export default {
  async pokemon(_, { id }) {
    return await service.search(id)
  },
}
