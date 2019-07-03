/* istanbul ignore file */
import IORedis, { Redis } from 'ioredis'
import log from 'fancy-log'

interface Params {
  host: string
  port: number
  timeToRetry: number
  retries: number
}

export default class {
  private client: Redis

  constructor({ host, port, timeToRetry, retries }: Params) {
    this.client = this.connect({ host, port, timeToRetry, retries })
  }

  connect({ host, port, timeToRetry, retries }: Params) {
    const client = new IORedis({
      host: host,
      port: port,
      retryStrategy(times) {
        return Math.min(times * timeToRetry, 2000)
      },
      maxRetriesPerRequest: retries,
    })

    client.on('connect', () => {
      log.info('Connected to redis')
    })

    client.on('error', err => {
      log.error(`Redis error: ${err}`)
    })

    return client
  }

  async clear() {
    await this.client.flushall()
  }

  async get(key: string) {
    return await this.client.get(key)
  }

  async set(key: string, value: any, expire: number) {
    await this.client.set(key, value)
    if (expire) await this.client.expire(key, expire)
  }
}
