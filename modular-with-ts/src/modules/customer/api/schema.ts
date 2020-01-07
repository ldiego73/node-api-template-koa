import Joi from '@hapi/joi'

const schemaId = {
  id: Joi.number().required(),
}

const schemaOrderId = {
  id: Joi.number().required(),
  orderId: Joi.number().required(),
}

export { schemaId, schemaOrderId }
