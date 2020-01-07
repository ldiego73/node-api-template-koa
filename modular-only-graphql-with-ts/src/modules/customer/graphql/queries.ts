import Service from '../service'

const service = new Service()

const queries = {
  async customers() {
    return await service.findCustomersAll()
  },
  async customer(_: any, { id }: any) {
    return await service.findCustomerById(id)
  },
  async orders(_: any, { customerId }: any) {
    return await service.findOrdersByCustomer(customerId)
  },
  async order(_: any, { customerId, orderId }: any) {
    return await service.findOrderByCustomer(customerId, orderId)
  },
  async products(_: any, { orderId }: any) {
    return await service.findProducstByOrder(orderId)
  },
}

const customer = {
  async orders({ id }: any) {
    return await service.findOrdersByCustomer(id)
  },
  async order({ id }: any, { orderId }: any) {
    return await service.findOrderByCustomer(id, orderId)
  },
}

const order = {
  async products({ id }: any) {
    return await service.findProducstByOrder(id)
  },
}

export { queries, customer, order }
