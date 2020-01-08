/* eslint require-atomic-updates: 0 */

import Service from '../services/customer.service'
import { RouterContext } from 'koa-router'

const service = new Service()

export default class {
  async getCustomers(ctx: RouterContext): Promise<any> {
    ctx.body = await service.findCustomersAll()
  }

  async getCustomerById(ctx: RouterContext): Promise<any> {
    const id = parseInt(ctx.params.id)
    const result = await service.findCustomerById(id)

    if (result) {
      ctx.body = result
    } else {
      ctx.throw(404, `Customer ${id} not found`)
    }
  }

  async getOrders(ctx: RouterContext): Promise<any> {
    const id = parseInt(ctx.params.id)
    const result = await service.findOrdersByCustomer(id)

    if (result && result.length > 0) {
      ctx.body = result
    } else {
      ctx.throw(404, `Orders by Customer ${id} not found`)
    }
  }

  async getOrderById(ctx: RouterContext): Promise<any> {
    const id = parseInt(ctx.params.id)
    const orderId = parseInt(ctx.params.orderId)

    const order = await service.findOrderByCustomer(id, orderId)

    if (order) {
      ctx.body = order
    } else {
      ctx.throw(404, `Order ${orderId} by Customer ${id} not found`)
    }
  }

  async getProducts(ctx: RouterContext): Promise<any> {
    const id = parseInt(ctx.params.id)
    const orderId = parseInt(ctx.params.orderId)

    const order = await service.findOrderByCustomer(id, orderId)

    if (order) {
      const products = await service.findProducstByOrder(order.id)

      if (products && products.length > 0) {
        ctx.body = products
      } else {
        ctx.throw(404, `Products by Order ${orderId} not found`)
      }
    } else {
      ctx.throw(404, `Order ${orderId} by Customer ${id} not found`)
    }
  }
}
