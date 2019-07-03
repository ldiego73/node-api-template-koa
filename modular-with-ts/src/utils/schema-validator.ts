import { BaseContext } from 'koa'
import joi from '@hapi/joi'

const validateObject = (
  object: object,
  label: string,
  schema: object,
  options?: any
) => {
  if (!schema) return

  const { error } = joi.validate(object, schema, options)
  if (error) {
    throw new Error(`Invalid ${label} - ${error.message}`)
  }
}

const validate = (obj: any) => (ctx: BaseContext, next: () => Promise<any>) => {
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
