import Koa from 'koa'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { ApolloServer } from 'apollo-server-koa'
import log from 'fancy-log'
import yenv from 'yenv'

import {
  access as accessLogger,
  error as errorLogger,
} from './utils/api-logger'
import csp from './utils/csp'
import compress from './utils/compress'
import notFavicon from './utils/api-not-favicon'
import apiError from './utils/api-error'
import docs from './utils/api-docs'
import routes from './routes'
import AppGraphqlModule from './graphql'
import { createTracing, middlewareTracing } from './tracing'
import Logger from './utils/logger'

const env = yenv()
const PORT = env.PORT

const { schema } = AppGraphqlModule
const server = new Koa()
const serverGraphql = new ApolloServer({
  schema,
  context: ({ ctx }) => ctx,
  introspection: true,
})

createTracing({
  name: 'api-modular',
  server: 'http://localhost:8200',
})

server
  .use(accessLogger)
  .use(errorLogger)
  .use(helmet.contentSecurityPolicy(csp))
  .use(cors())
  .use(compress)
  .use(bodyParser())
  .use(notFavicon)
  .use(middlewareTracing)
  .use(apiError)
  .use(docs)
  .use(serverGraphql.getMiddleware())

routes.map(r => {
  server.use(r.routes())
  server.use(r.allowedMethods())
})

if (env.NODE_ENV === 'production') {
  Logger.enableProductionMode()
}

/* istanbul ignore if  */
if (env.NODE_ENV !== 'test') {
  server
    .listen(PORT, '0.0.0.0', () =>
      log.info(`Server listening on PORT: ${PORT}`)
    )
    .on('error', log.error)
}

export default server
