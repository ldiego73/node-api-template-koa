import customers from '../data/customers.json'
import orders from '../data/orders.json'
import products from '../data/products.json'

export default class {
  async findCustomersAll() {
    return new Promise(resolve => resolve(customers))
  }

  async findCustomerById(id) {
    return new Promise(resolve => {
      resolve(customers.find(c => c.id === id))
    })
  }

  async findOrdersByCustomer(customerId) {
    return new Promise(resolve => {
      resolve(orders.filter(o => o.customer_id === customerId))
    })
  }

  async findOrderByCustomer(customerId, orderId) {
    return new Promise(resolve => {
      resolve(
        orders.find(o => o.customer_id === customerId && o.id === orderId)
      )
    })
  }

  async findProducstByOrder(orderId) {
    return new Promise(resolve => {
      resolve(products.filter(p => p.order_id === orderId))
    })
  }
}
