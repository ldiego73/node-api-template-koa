import Service from '../../services/customer.service'

const service = new Service()

const queries = {
  async customers() {
    return await service.findCustomersAll()
  },
  async customer(_, { id }) {
    return await service.findCustomerById(id)
  },
  async orders(_, { customerId }) {
    return await service.findOrdersByCustomer(customerId)
  },
  async order(_, { customerId, orderId }) {
    return await service.findOrderByCustomer(customerId, orderId)
  },
  async products(_, { orderId }) {
    return await service.findProducstByOrder(orderId)
  },
}

const customer = {
  async orders({ id }) {
    return await service.findOrdersByCustomer(id)
  },
  async order({ id }, { orderId }) {
    return await service.findOrderByCustomer(id, orderId)
  },
}

const order = {
  async products({ id }) {
    return await service.findProducstByOrder(id)
  },
}

export { queries, customer, order }
