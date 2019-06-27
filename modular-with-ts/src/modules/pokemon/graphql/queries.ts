import Service from "../service"

const service = new Service()

export default {
  async pokemon(_: any, { id }: any) {
    return await service.search(id)
  },
}
