import apmServer from 'elastic-apm-node'

let apm = null

export const TracingTypes = {}

TracingTypes[(TracingTypes['api'] = 0)] = 'api'
TracingTypes[(TracingTypes['controller'] = 1)] = 'controller'
TracingTypes[(TracingTypes['service'] = 2)] = 'service'
TracingTypes[(TracingTypes['repository'] = 3)] = 'repository'
TracingTypes[(TracingTypes['graphql'] = 4)] = 'graphql'

export const createTracing = ({ name, server, pathGraphQL }) => {
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

export const params = (trace, ctx) => {
  const { req, res } = ctx

  console.log('dentro params', ctx)

  trace.setLabel('http_url', ctx.path || req.url)
  trace.setLabel('http_method', ctx.method || req.method)
  trace.setLabel('http_status_code', res.statusCode)
  trace.setLabel('http_error', res.statusCode >= 400 ? true : false)

  trace.result = res.statusCode >= 400 ? 'error' : 'success'
}

export const paramsAndEnd = (trace, ctx) => {
  params(trace, ctx)

  trace.end()
}

export const middlewareTracing = async (ctx, next) => {
  const { req } = ctx

  if (apm.pathGraphQL && ctx.path === apm.pathGraphQL) {
    await next()
    return
  }

  const trace = transaction(
    `${ctx.method} ${ctx.path}`,
    TracingTypes[TracingTypes.api]
  )

  req.trace = trace

  await next()

  paramsAndEnd(trace, ctx)
}

export const middlewareGraphql = (ctx, label, next) => {
  const { req } = ctx

  const trace = transaction(
    `GRAPHQL /${label}`,
    TracingTypes[TracingTypes.graphql]
  )

  req.trace = trace
}
