import { RouterContext } from 'koa-router'

interface Options {
  requestHeader?: string
  responseHeader?: string
  fallbackLatest?: boolean
  defaultVersion?: string
}

interface Version {
  version: string
  method: any
}

const defaultOptions: Options = {
  requestHeader: 'x-api-version',
  responseHeader: 'x-api-version',
  fallbackLatest: false,
  defaultVersion: null,
}

const clear = (version: string) => version.replace(/\./gi, '')
const cast = (version: string) => parseInt(version)
const clearAndCast = (version: string) => cast(clear(version))

const findMethod = (
  requestVersion: string,
  tuples: Array<Version>,
  fallbackLatest = false
): Version => {
  if (requestVersion === null || requestVersion === '*') {
    return tuples[0]
  }

  for (let i = 0, t = tuples.length; i < t; i += 1) {
    const { version } = tuples[i]

    if (requestVersion === version) {
      return tuples[i]
    }
  }

  if (fallbackLatest) {
    return tuples[0]
  }

  return null
}

const versions = (versions: any, options: Options) => (
  ctx: RouterContext,
  next: () => Promise<any>
) => {
  const config: Options = Object.assign({}, defaultOptions, options)
  const tuples: Array<Version> = []

  /* istanbul ignore if */
  if (config.fallbackLatest && config.defaultVersion) {
    ctx.throw(
      400,
      'Can not set options "fallbackLatest" and "defaultVersion" at same time'
    )
    return
  }

  const keys = Object.keys(versions)

  keys.forEach(v => {
    tuples.push({ version: v, method: versions[v] })
  })

  tuples.sort((a, b) => {
    const v1 = clearAndCast(a.version)
    const v2 = clearAndCast(b.version)

    return v1 < v2 ? 1 : -1
  })

  try {
    let version = ctx.get(config.requestHeader) || null

    if (!version && config.defaultVersion) version = config.defaultVersion

    const found = findMethod(version, tuples, config.fallbackLatest)

    if (found) {
      const { version, method } = found
      ctx.state.apiVersion = version
      ctx.set(config.responseHeader, version)

      return method(ctx, next)
    }

    ctx.throw(400, 'Version ' + version + ' is not supported')
  } catch (err) {
    ctx.throw(400, err.message)
  }
}

export default versions
