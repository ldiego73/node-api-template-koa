const toResponse = (status, params) => {
  const { title, detail, instance } = params

  return {
    type: 'about:blank',
    title,
    status,
    detail,
    instance,
  }
}

export default class {
  static notFound(ctx) {
    ctx.status = 404
    ctx.body = toResponse(ctx.status, {
      title: 'Not Found',
      detail: '',
      instance: ctx.url,
    })
    return ctx.body
  }

  static internalServerError(ctx, err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = toResponse(ctx.status, {
      title: err.message,
      detail: err.stack,
      instance: ctx.url,
    })
    return ctx.body
  }
}
