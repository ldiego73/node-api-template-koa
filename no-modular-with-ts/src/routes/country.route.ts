import Router from 'koa-router'

import CountryController from '../controllers/country.controller'
import schemaValidator from '../utils/schema-validator'
import schema from '../schemas/country.schema'

const controller = new CountryController()
const router = new Router({ prefix: '/country' })
const isoValidator = schemaValidator({ params: schema })

router.get('country/list', '/', controller.list)
router.get('country/iso', '/:iso', isoValidator, controller.findByIso)

export default router
