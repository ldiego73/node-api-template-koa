import { TracingTypes, transaction, span, middlewareGraphql } from '../'

const context = (type, args) => {
  let ctx = null

  if (TracingTypes.graphql === type) {
    // eslint-disable-next-line no-extra-semi
    ;[, , ctx] = args
  } else {
    // eslint-disable-next-line no-extra-semi
    ;[ctx] = args
  }

  return ctx
}

const createTrace = ({ label, type, initialize, ctx }) => {
  if (initialize) {
    return transaction(label, TracingTypes[type], ctx.req.trace)
  }

  return span(label, TracingTypes[type], ctx.req.trace)
}

export function trace(params) {
  return function(target, key, descriptor) {
    const { name, type, initialize } = params || {}
    const original = descriptor.value
    const label = name || key
    const typeId = type || TracingTypes.controller

    descriptor.value = function(...args) {
      const ctx = context(typeId, args)
      const trace = createTrace({ label, type: typeId, initialize, ctx })
      const result = original.apply(this, args)

      if (result instanceof Promise) {
        result.finally(() => {
          trace.end()
        })
      } else {
        trace.end()
      }

      return result
    }
  }
}

export function traceGraphQL(params) {
  return function(target, key, descriptor) {
    const { name } = params || {}
    const original = descriptor.value

    descriptor.value = function(...args) {
      const ctx = context(TracingTypes.graphql, args)

      middlewareGraphql(ctx, name || key)

      const result = original.apply(this, args)
      const { trace } = ctx.req

      if (result instanceof Promise) {
        result.finally(() => {
          trace.end()
        })
      } else {
        trace.end()
      }

      return result
    }
  }
}
