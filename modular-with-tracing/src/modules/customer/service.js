import { trace } from '../../tracing/decorators'
import { TracingTypes } from '../../tracing/index'
import Repository from './repository'

const repository = new Repository()

export default class {
  @trace({ type: TracingTypes.service })
  async findCustomersAll(ctx) {
    return await repository.findCustomersAll(ctx)
  }

  @trace({ type: TracingTypes.service })
  async findCustomerById(ctx, id) {
    return await repository.findCustomerById(ctx, id)
  }

  @trace({ type: TracingTypes.service })
  async findOrdersByCustomer(ctx, customerId) {
    return await repository.findOrdersByCustomer(ctx, customerId)
  }

  @trace({ type: TracingTypes.service })
  async findOrderByCustomer(ctx, customerId, orderId) {
    return await repository.findOrderByCustomer(ctx, customerId, orderId)
  }

  @trace({ type: TracingTypes.service })
  async findProducstByOrder(ctx, orderId) {
    return await repository.findProducstByOrder(ctx, orderId)
  }
}
