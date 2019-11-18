import Joi from '@hapi/joi'

const schemaId = Joi.object({
  id: Joi.number().required(),
})

const schemaOrderId = Joi.object({
  id: Joi.number().required(),
  orderId: Joi.number().required(),
})

export { schemaId, schemaOrderId }
