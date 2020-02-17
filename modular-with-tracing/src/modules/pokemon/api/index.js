import Router from 'koa-router'

import Controller from './controller'
import schemaValidator from '../../../utils/schema-validator'
import schema from './schema'

const controller = new Controller()
const router = new Router({ prefix: '/pokemon' })
const validator = schemaValidator({ params: schema })

router.get('pokemon/find', '/:id', validator, controller.findById)

export default router
