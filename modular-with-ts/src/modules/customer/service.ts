import Repository from './repository'
import { Customer } from './models/customer'
import { Order } from './models/order'
import { Product } from './models/product'

const repository = new Repository()

export default class {
  async findCustomersAll(): Promise<Customer[]> {
    return await repository.findCustomersAll()
  }

  async findCustomerById(id: number): Promise<Customer> {
    return await repository.findCustomerById(id)
  }

  async findOrdersByCustomer(customerId: number): Promise<Order[]> {
    return await repository.findOrdersByCustomer(customerId)
  }

  async findOrderByCustomer(
    customerId: number,
    orderId: number
  ): Promise<Order> {
    return await repository.findOrderByCustomer(customerId, orderId)
  }

  async findProducstByOrder(orderId: number): Promise<Product[]> {
    return await repository.findProducstByOrder(orderId)
  }
}
