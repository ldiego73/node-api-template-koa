/* istanbul ignore file */
import IORedis from 'ioredis'
import log from 'fancy-log'

class Redis {
  constructor({ host, port, timeToRetry, retries }) {
    this.client = this.connect({ host, port, timeToRetry, retries })
  }

  connect({ host, port, timeToRetry, retries }) {
    const client = new IORedis({
      host: host,
      port: port,
      retryStrategy(times) {
        const delay = Math.min(times * timeToRetry, 2000)
        return delay
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

  async get(key) {
    return await this.client.get(key)
  }

  async set(key, value, expire) {
    await this.client.set(key, value)
    if (expire) await this.client.expire(key, expire)
  }
}

export default class Singleton {
  constructor() {
    if (!Singleton.instance) {
      log.info('Single instance Redis')
      Singleton.instance = new Redis()
    }
  }

  getInstance() {
    return Singleton.instance
  }
}
