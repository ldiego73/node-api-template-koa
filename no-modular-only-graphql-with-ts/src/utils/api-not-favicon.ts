import { Context } from 'koa'

export default async (ctx: Context, next: () => Promise<any>) => {
  if (ctx.request.url === `/favicon.ico`) {
    ctx.status = 204
    return
  }

  await next()
}
