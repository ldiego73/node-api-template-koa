import apmServer from 'elastic-apm-node'

let apm = null
const params = new Map()

export const TracingTypes = {}

TracingTypes[(TracingTypes['api'] = 0)] = 'api'
TracingTypes[(TracingTypes['controller'] = 1)] = 'controller'
TracingTypes[(TracingTypes['service'] = 2)] = 'service'
TracingTypes[(TracingTypes['repository'] = 3)] = 'repository'
TracingTypes[(TracingTypes['graphql'] = 4)] = 'graphql'

export const addParam = (key, value) => params.set(key, value)
export const addParams = (...items) => items.map(i => addParam(i.key, i.value))
export const clearParams = () => params.clear()

export const create = ({ name, server, pathGraphQL }) => {
  if (!name) {
    throw Error('The name is a field required')
  }

  if (!server) {
    throw Error('The Server URL is a field required')
  }

  apm = apmServer.start({
    serviceName: name,
    serverUrl: server,
  })
  apm.name = name
  apm.server = server
  apm.pathGraphQL = pathGraphQL || '/graphql'
}

export const transaction = (name, type, parent) => {
  if (parent) return apm.startTransaction(name, type, { childOf: parent })

  return apm.startTransaction(name, type)
}

export const span = (name, type, parent) => {
  if (parent) return apm.startSpan(name, type, { childOf: parent })

  return apm.startSpan(name, type)
}

export const createParams = (trace, ctx) => {
  const { req, res } = ctx

  trace.setLabel('http_url', ctx.path || req.url)
  trace.setLabel('http_method', ctx.method || req.method)
  trace.setLabel('http_status_code', res.statusCode)
  trace.setLabel('http_error', res.statusCode >= 400 ? true : false)

  trace.result = res.statusCode >= 400 ? 'error' : 'success'
}

export const middleware = async (ctx, next) => {
  const { req } = ctx
  const apolloTracing = ctx.get('x-apollo-tracing')

  if (apolloTracing) {
    await next()
    return
  }

  const trace = transaction(
    `${ctx.method} ${ctx.path}`,
    TracingTypes[TracingTypes.api]
  )

  req.trace = trace
  ctx.set('apm-transaction-id', trace.id)

  await next()

  createParams(trace, ctx)

  trace.end()
}

export const middlewareGraphql = (ctx, label, next) => {
  const { req, res } = ctx

  const trace = transaction(
    `GRAPHQL /${label}`,
    TracingTypes[TracingTypes.graphql],
    req.trace
  )

  req.trace = trace
}
