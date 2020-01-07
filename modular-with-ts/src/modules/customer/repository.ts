import customers from './data/customers.json'
import orders from './data/orders.json'
import products from './data/products.json'

import { Customer } from './models/customer'
import { Order } from './models/order'
import { Product } from './models/product'

export default class {
  async findCustomersAll(): Promise<Customer[]> {
    return new Promise(resolve => resolve(customers))
  }

  async findCustomerById(id: number): Promise<Customer> {
    return new Promise(resolve => {
      resolve(customers.find(c => c.id === id))
    })
  }

  async findOrdersByCustomer(customerId: number): Promise<Order[]> {
    return new Promise(resolve => {
      resolve(orders.filter(o => o.customer_id === customerId))
    })
  }

  async findOrderByCustomer(
    customerId: number,
    orderId: number
  ): Promise<Order> {
    return new Promise(resolve => {
      resolve(
        orders.find(o => o.customer_id === customerId && o.id === orderId)
      )
    })
  }

  async findProducstByOrder(orderId: number): Promise<Product[]> {
    return new Promise(resolve => {
      resolve(products.filter(p => p.order_id === orderId))
    })
  }
}
