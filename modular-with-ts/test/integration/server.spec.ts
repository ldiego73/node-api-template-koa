import supertest from 'supertest'
import server from '../../src/server'

const app = server.listen()
const TIMEOUT = 1000 * 60 * 30

afterAll(() => {
  app.close()
})

describe('GET /', () => {
  const request = supertest(app)

  it(
    '<404> should always return not found',
    async () => {
      const url = '/unknown'
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(404)

      const { type, title, status, detail, instance } = res.body

      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining([
          'type',
          'title',
          'status',
          'detail',
          'instance',
        ])
      )
      expect(type).toBe('about:blank')
      expect(title).toBe('Not Found')
      expect(status).toBe(res.status)
      expect(detail).toBe('')
      expect(instance).toBe(url)
    },
    TIMEOUT
  )

  test(
    '<204> should always return with call favicon.ico',
    async () => {
      const url = '/favicon.ico'
      await request.get(url).expect(204)
    },
    TIMEOUT
  )
})
