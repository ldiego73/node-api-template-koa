export default async (ctx, next) => {
  if (ctx.request.url === `/favicon.ico`) {
    ctx.status = 204
    return
  }

  await next()
}
