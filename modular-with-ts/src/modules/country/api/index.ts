import Router from 'koa-router'

import Controller from './controller'
import schemaValidator from '../../../utils/schema-validator'
import schema from './schema'

const controller = new Controller()
const router = new Router({ prefix: '/country' })
const validator = schemaValidator({ params: schema })

router.get('country/list', '/', controller.list)
router.get('country/iso', '/:iso', validator, controller.findByIso)

export default router
