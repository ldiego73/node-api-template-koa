import Repository from '../repositories/customer.repository'

const repository = new Repository()

export default class {
  async findCustomersAll() {
    return await repository.findCustomersAll()
  }

  async findCustomerById(id) {
    return await repository.findCustomerById(id)
  }

  async findOrdersByCustomer(customerId) {
    return await repository.findOrdersByCustomer(customerId)
  }

  async findOrderByCustomer(customerId, orderId) {
    return await repository.findOrderByCustomer(customerId, orderId)
  }

  async findProducstByOrder(orderId) {
    return await repository.findProducstByOrder(orderId)
  }
}
