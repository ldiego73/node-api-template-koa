import { trace } from '../../tracing/decorators'
import { TracingTypes } from '../../tracing/index'
import customers from './data/customers.json'
import orders from './data/orders.json'
import products from './data/products.json'

export default class {
  @trace({ type: TracingTypes.repository })
  async findCustomersAll(ctx) {
    return new Promise(resolve => resolve(customers))
  }

  @trace({ type: TracingTypes.repository })
  async findCustomerById(ctx, id) {
    return new Promise(resolve => {
      resolve(customers.find(c => c.id === id))
    })
  }

  @trace({ type: TracingTypes.repository })
  async findOrdersByCustomer(ctx, customerId) {
    return new Promise(resolve => {
      resolve(orders.filter(o => o.customer_id === customerId))
    })
  }

  @trace({ type: TracingTypes.repository })
  async findOrderByCustomer(ctx, customerId, orderId) {
    return new Promise(resolve => {
      resolve(
        orders.find(o => o.customer_id === customerId && o.id === orderId)
      )
    })
  }

  @trace({ type: TracingTypes.repository })
  async findProducstByOrder(ctx, orderId) {
    return new Promise(resolve => {
      resolve(products.filter(p => p.order_id === orderId))
    })
  }
}
