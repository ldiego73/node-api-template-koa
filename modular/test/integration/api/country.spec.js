import supertest from 'supertest'
import server from '../../../src/server'

const app = server.listen()
const TIMEOUT = 1000 * 60 * 30

afterAll(() => {
  app.close()
})

describe('GET /country', () => {
  const request = supertest(app)

  it(
    'Should return a list of countries',
    async () => {
      const url = '/country'
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(Array.isArray(data)).toBe(true)
      expect(Object.keys(data[0])).toEqual(
        expect.arrayContaining([
          'name',
          'iso',
          'brand_id',
          'currency',
          'status',
        ])
      )
    },
    TIMEOUT
  )

  it(
    'Should return a country',
    async () => {
      const iso = 'PE'
      const url = `/country/${iso}`
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(Object.keys(data)).toEqual(
        expect.arrayContaining([
          'name',
          'iso',
          'brand_id',
          'currency',
          'status',
        ])
      )

      expect(data.iso).toBe(iso)
    },
    TIMEOUT
  )

  it(
    'Should return not found when the country not exists',
    async () => {
      const country = 'AR'
      const url = `/country/${country}`
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(400)

      const data = res.body

      expect(Object.keys(data)).toEqual(
        expect.arrayContaining([
          'type',
          'title',
          'status',
          'detail',
          'instance',
        ])
      )

      const { type, title, status, detail, instance } = data

      expect(type).toBe('about:blank')
      expect(title).toBe(`Country ${country} not found`)
      expect(status).toBe(res.status)
      expect(detail).toEqual(expect.stringContaining('BadRequestError'))
      expect(instance).toBe(url)
    },
    TIMEOUT
  )

  it(
    'Should return bad request when the format the params iso is invalid',
    async () => {
      const country = '123'
      const url = `/country/${country}`
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(400)

      const data = res.body

      expect(Object.keys(data)).toEqual(
        expect.arrayContaining([
          'type',
          'title',
          'status',
          'detail',
          'instance',
        ])
      )

      const { type, title, status, detail, instance } = data

      expect(type).toBe('about:blank')
      expect(title).toEqual(expect.stringContaining('Invalid URL Parameters'))
      expect(status).toBe(res.status)
      expect(detail).toEqual(expect.stringContaining('BadRequestError'))
      expect(instance).toBe(url)
    },
    TIMEOUT
  )
})
