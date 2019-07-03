import Koa from 'koa'
import helmet from 'koa-helmet'
import bodyParser from 'koa-bodyparser'
import { ApolloServer } from 'apollo-server-koa'
import yenv from 'yenv'
import log from 'fancy-log'

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

const env = yenv()
const PORT = env.PORT

const { schema, context } = AppGraphqlModule
const server = new Koa()
const serverGraphql = new ApolloServer({ schema, context, introspection: true })

server
  .use(accessLogger)
  .use(errorLogger)
  .use(helmet.contentSecurityPolicy(csp))
  .use(compress)
  .use(bodyParser())
  .use(notFavicon)
  .use(apiError)
  .use(docs)

routes.map(r => {
  server.use(r.routes())
  server.use(r.allowedMethods())
})

serverGraphql.applyMiddleware({ app: server })

/* istanbul ignore if  */
if (env.NODE_ENV !== 'test') {
  server
    .listen(PORT, '0.0.0.0', () =>
      log.info(`Server listening on PORT: ${PORT}`)
    )
    .on('error', log.error)
}

export default server
