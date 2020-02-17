import Joi from '@hapi/joi'

const validateObject = (object, label, params, options) => {
  if (!params) return

  const schema = Joi.object(params)

  const { error } = schema.validate(object, options)
  if (error) {
    throw new Error(`Invalid ${label} - ${error.message}`)
  }
}

const validate = ({ headers, params, query, body }) => (ctx, next) => {
  try {
    validateObject(ctx.headers, 'Headers', headers, {
      allowUnknown: true,
    })
    validateObject(ctx.params, 'URL Parameters', params)
    validateObject(ctx.query, 'URL Query', query)

    if (ctx.request.body) {
      validateObject(ctx.request.body, 'Request Body', body)
    }

    return next()
  } catch (err) {
    ctx.throw(400, err.message)
  }
}

export default validate
