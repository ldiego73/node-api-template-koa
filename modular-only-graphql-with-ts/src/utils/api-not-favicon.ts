import { BaseContext } from 'koa'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (ctx: BaseContext, next: () => Promise<any>) => {
  if (ctx.request.url === '/favicon.ico') {
    ctx.status = 204
    return
  }

  await next()
}
