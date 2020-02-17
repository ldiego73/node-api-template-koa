import supertest from 'supertest'
import server from '../../../src/server'

const app = server.listen()
const TIMEOUT = 1000 * 60 * 30

afterAll(() => {
  app.close()
})

describe('GET /pokemon', () => {
  const request = supertest(app)

  it(
    'Should return one pokemon',
    async () => {
      const code = parseInt(Math.random(150) * 100)
      const url = `/pokemon/${code}`
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(Object.keys(data)).toEqual(
        expect.arrayContaining([
          'id',
          'name',
          'base_experience',
          'height',
          'weight',
          'images',
        ])
      )

      const { id, images } = data

      expect(Object.keys(images)).toEqual(
        expect.arrayContaining(['normal', 'shiny'])
      )

      expect(id).toBe(code.toString())
    },
    TIMEOUT
  )

  it(
    'Should return bad request when the format the params id is invalid',
    async () => {
      const code = 'ABC'
      const url = `/pokemon/${code}`
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

  it(
    'Should return internal error when the pokemon not exists',
    async () => {
      const code = 100000
      const url = `/pokemon/${code}`
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(500)

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
      expect(title).toBe('Request failed with status code 404')
      expect(status).toBe(res.status)
      expect(detail).toEqual(expect.stringContaining('Error:'))
      expect(instance).toBe(url)
    },
    TIMEOUT
  )
})
