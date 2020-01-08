import Router from 'koa-router'

import Controller from '../controllers/customer.controller'
import schemaValidator from '../utils/schema-validator'
import { schemaId, schemaOrderId } from '../schemas/customer.schema'

const controller = new Controller()
const router = new Router({ prefix: '/customers' })
const validatorId = schemaValidator({ params: schemaId })
const validatorOrderId = schemaValidator({ params: schemaOrderId })

router.get('customers/all', '/', controller.getCustomers)
router.get('customers/id', '/:id', validatorId, controller.getCustomerById)
router.get('customers/orders', '/:id/orders', validatorId, controller.getOrders)
router.get(
  'customers/order',
  '/:id/orders/:orderId',
  validatorOrderId,
  controller.getOrderById
)
router.get(
  'customers/orders/products',
  '/:id/orders/:orderId/products',
  validatorOrderId,
  controller.getProducts
)

export default router
