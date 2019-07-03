import { BaseContext } from 'koa'

export default async (ctx: BaseContext, next: () => Promise<any>) => {
  if (ctx.request.url === `/favicon.ico`) {
    ctx.status = 204
    return
  }

  await next()
}
