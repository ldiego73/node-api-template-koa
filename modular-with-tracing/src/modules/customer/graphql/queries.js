import { traceGraphQL } from '../../../tracing/decorators'
import Service from '../service'

const service = new Service()

class Queries {
  @traceGraphQL()
  async customers(_, __, ctx) {
    return await service.findCustomersAll(ctx)
  }

  @traceGraphQL()
  async customer(_, { id }, ctx) {
    return await service.findCustomerById(ctx, id)
  }

  @traceGraphQL()
  async orders(_, { customerId }, ctx) {
    return await service.findOrdersByCustomer(ctx, customerId)
  }

  @traceGraphQL()
  async order(_, { customerId, orderId }, ctx) {
    return await service.findOrderByCustomer(ctx, customerId, orderId)
  }

  @traceGraphQL()
  async products(_, { orderId }, ctx) {
    return await service.findProducstByOrder(ctx, orderId)
  }

  @traceGraphQL()
  async ordersByCustomer({ id }, __, ctx) {
    return await service.findOrdersByCustomer(ctx, id)
  }

  @traceGraphQL()
  async orderByCustomer({ id }, { orderId }, ctx) {
    return await service.findOrderByCustomer(ctx, id, orderId)
  }

  @traceGraphQL()
  async productsByOrder({ id }, __, ctx) {
    return await service.findProducstByOrder(ctx, id)
  }
}

const q = new Queries()

const queries = {
  customers: q.customers,
  customer: q.customer,
  orders: q.orders,
  order: q.order,
  products: q.products,
}

const customer = {
  orders: q.ordersByCustomer,
  order: q.orderByCustomer,
}

const order = {
  products: q.productsByOrder,
}

export { queries, customer, order }
