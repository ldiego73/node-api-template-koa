import joi from '@hapi/joi'

const validateObject = (object, label, schema, options) => {
  if (!schema) return

  const { error } = joi.validate(object, schema, options)
  if (error) {
    throw new Error(`Invalid ${label} - ${error.message}`)
  }
}

const validate = obj => (ctx, next) => {
  try {
    validateObject(ctx.headers, 'Headers', obj.headers, {
      allowUnknown: true,
    })
    validateObject(ctx.params, 'URL Parameters', obj.params)
    validateObject(ctx.query, 'URL Query', obj.query)

    if (ctx.request.body) {
      validateObject(ctx.request.body, 'Request Body', obj.body)
    }

    return next()
  } catch (err) {
    ctx.throw(400, err.message)
  }
}

export default validate
