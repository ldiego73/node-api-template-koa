import Router from 'koa-router'

import Controller from './controller'
import schemaValidator from '../../../utils/schema-validator'
import schema from './schema'

import versions from '../../../utils/api-version'

const controller = new Controller()
const router = new Router({ prefix: '/country' })
const validator = schemaValidator({ params: schema })

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
router.get('country/iso', '/:iso', validator, controller.findByIso)

export default router
