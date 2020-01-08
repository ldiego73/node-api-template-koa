/* eslint require-atomic-updates: 0 */

import Service from '../services/customer.service'

const service = new Service()

export default class {
  async getCustomers(ctx) {
    ctx.body = await service.findCustomersAll()
  }

  async getCustomerById(ctx) {
    const id = parseInt(ctx.params.id)
    const result = await service.findCustomerById(id)

    if (result) {
      ctx.body = result
    } else {
      ctx.throw(400, `Customer ${id} not found`)
    }
  }

  async getOrders(ctx) {
    const id = parseInt(ctx.params.id)
    const result = await service.findOrdersByCustomer(id)

    if (result) {
      ctx.body = result
    } else {
      ctx.throw(400, `Orders by Customer ${id} not found`)
    }
  }

  async getOrderById(ctx) {
    const id = parseInt(ctx.params.id)
    const orderId = parseInt(ctx.params.orderId)

    const order = await service.findOrderByCustomer(id, orderId)

    if (order) {
      ctx.body = order
    } else {
      ctx.throw(400, `Order ${orderId} by Customer ${id} not found`)
    }
  }

  async getProducts(ctx) {
    const id = parseInt(ctx.params.id)
    const orderId = parseInt(ctx.params.orderId)

    const order = await service.findOrderByCustomer(id, orderId)

    if (order) {
      const products = await service.findProducstByOrder(order.id)

      if (products) {
        ctx.body = products
      } else {
        ctx.throw(400, `Products by Order ${id} not found`)
      }
    } else {
      ctx.throw(400, `Order ${orderId} by Customer ${id} not found`)
    }
  }
}
