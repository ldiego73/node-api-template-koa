import { Context } from 'koa'
import ResponseError from './response-error'

export default async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next()
    if (!ctx.body && (!ctx.status || ctx.status === 404)) {
      return ResponseError.notFound(ctx)
    }
  } catch (err) {
    /* istanbul ignore next */
    return ResponseError.internalServerError(ctx, err)
  }
}
