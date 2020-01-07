import { Context } from 'koa'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (ctx: Context, next: () => Promise<any>) => {
  if (ctx.request.url === '/favicon.ico') {
    ctx.status = 204
    return
  }

  await next()
}
