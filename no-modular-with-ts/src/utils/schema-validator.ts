import { RouterContext } from 'koa-router'
import Joi from '@hapi/joi'

interface ValidateOptions {
  headers?: object
  params?: object
  query?: object
  body?: object
}

const validateObject = (
  object: object,
  label: string,
  params: object,
  options?: any
) => {
  if (!params) return

  const schema = Joi.object(params)

  const { error } = schema.validate(object, options)
  if (error) {
    throw new Error(`Invalid ${label} - ${error.message}`)
  }
}

const validate = (obj: ValidateOptions) => (
  ctx: RouterContext,
  next: () => Promise<any>
) => {
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
