import Router from 'koa-router'

import CountryController from '../controllers/country.controller'
import schemaValidator from '../utils/schema-validator'
import schema from '../schemas/country.schema'

import versions from '../utils/api-version'

const controller = new CountryController()
const router = new Router({ prefix: '/country' })
const isoValidator = schemaValidator({ params: schema })

router.get('country/list', '/', controller.list)
router.get(
  'country/default',
  '/default',
  versions(
    {
      '1.0.0': controller.list,
      '2.0.0': controller.listV2,
    },
    { defaultVersion: '2.0.0' }
  )
)
router.get(
  'country/all',
  '/all',
  versions(
    {
      '1.0.0': controller.list,
      '2.0.0': controller.listV2,
    },
    { fallbackLatest: true }
  )
)
router.get('country/iso', '/:iso', isoValidator, controller.findByIso)

export default router
