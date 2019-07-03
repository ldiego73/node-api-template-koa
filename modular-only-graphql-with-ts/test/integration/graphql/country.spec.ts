import supertest from 'supertest'
import server from '../../../src/server'

const app = server.listen()
const TIMEOUT = 1000 * 60 * 30

afterAll(() => {
  app.close()
})

describe('POST /graphql => country', () => {
  const request = supertest(app)

  it(
    'Should return a list of countries',
    async () => {
      const res = await request
        .post(`/graphql`)
        .send({
          query: `{
            countries {
              iso
              name
            }
          }`,
        })
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(data).toEqual(
        expect.objectContaining({
          data: expect.any(Object),
        })
      )

      const { countries } = data.data

      expect(Array.isArray(countries)).toBe(true)
      expect(Object.keys(countries[0])).toEqual(
        expect.arrayContaining(['name', 'iso'])
      )
    },
    TIMEOUT
  )

  it(
    'Should return a list of countries order by name ASC',
    async () => {
      const res = await request
        .post('/graphql')
        .send({
          query: `{
            countries(orderBy: name_ASC) {
              iso
              name
            }
          }`,
        })
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(data).toEqual(
        expect.objectContaining({
          data: expect.any(Object),
        })
      )

      const { countries } = data.data

      expect(Array.isArray(countries)).toBe(true)
      expect(Object.keys(countries[0])).toEqual(
        expect.arrayContaining(['name', 'iso'])
      )
    },
    TIMEOUT
  )

  it(
    'Should return a list of countries order by name DESC',
    async () => {
      const res = await request
        .post('/graphql')
        .send({
          query: `{
            countries(orderBy: name_DESC) {
              iso
              name
            }
          }`,
        })
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(data).toEqual(
        expect.objectContaining({
          data: expect.any(Object),
        })
      )

      const { countries } = data.data

      expect(Array.isArray(countries)).toBe(true)
      expect(Object.keys(countries[0])).toEqual(
        expect.arrayContaining(['name', 'iso'])
      )
    },
    TIMEOUT
  )

  it(
    'Should return a list of countries order by iso ASC',
    async () => {
      const res = await request
        .post('/graphql')
        .send({
          query: `{
            countries(orderBy: iso_ASC) {
              iso
              name
            }
          }`,
        })
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(data).toEqual(
        expect.objectContaining({
          data: expect.any(Object),
        })
      )

      const { countries } = data.data

      expect(Array.isArray(countries)).toBe(true)
      expect(Object.keys(countries[0])).toEqual(
        expect.arrayContaining(['name', 'iso'])
      )
    },
    TIMEOUT
  )

  it(
    'Should return a list of countries order by iso DESC',
    async () => {
      const res = await request
        .post('/graphql')
        .send({
          query: `{
            countries(orderBy: iso_DESC) {
              iso
              name
            }
          }`,
        })
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(data).toEqual(
        expect.objectContaining({
          data: expect.any(Object),
        })
      )

      const { countries } = data.data

      expect(Array.isArray(countries)).toBe(true)
      expect(Object.keys(countries[0])).toEqual(
        expect.arrayContaining(['name', 'iso'])
      )
    },
    TIMEOUT
  )

  it(
    'Should return one country',
    async () => {
      const iso = 'PE'
      const res = await request
        .post(`/graphql`)
        .send({
          query: `{
            country(iso: "${iso}") {
              iso
              name
            }
          }`,
        })
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(data).toEqual(
        expect.objectContaining({
          data: expect.any(Object),
        })
      )

      const { country } = data.data
      expect(Object.keys(country)).toEqual(
        expect.arrayContaining(['name', 'iso'])
      )

      expect(country.iso).toBe(iso)
    },
    TIMEOUT
  )

  it(
    'Should add one country',
    async () => {
      const res = await request
        .post('/graphql')
        .send({
          query: `
            mutation {
              addCountry(id: 100, iso: "AR", name: "Argentina")
            }
          `,
        })
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(data).toEqual(
        expect.objectContaining({
          data: expect.any(Object),
        })
      )

      const { addCountry } = data.data
      expect(addCountry).toBe(true)
    },
    TIMEOUT
  )

  it(
    'Should error add one country by parameter required',
    async () => {
      const res = await request
        .post('/graphql')
        .send({
          query: `
            mutation {
              addCountry(iso: "AR", name: "Argentina")
            }
          `,
        })
        .expect('Content-Type', /json/)
        .expect(400)

      const data = res.body

      expect(data).toEqual(
        expect.objectContaining({
          errors: expect.any(Object),
        })
      )

      const { errors } = data

      expect(Array.isArray(errors)).toBe(true)

      const error = errors[0]

      expect(Object.keys(error)).toEqual(
        expect.arrayContaining(['message', 'locations', 'extensions'])
      )
      expect(error.message).toEqual(
        'Field "addCountry" argument "id" of type "Int!" is required, but it was not provided.'
      )
      expect(error.extensions.code).toBe('GRAPHQL_VALIDATION_FAILED')
    },
    TIMEOUT
  )

  it(
    'Should error add one country by parameter invalid',
    async () => {
      const id = 'ABC'
      const res = await request
        .post('/graphql')
        .send({
          query: `
            mutation {
              addCountry(id: "${id}", iso: "AR", name: "Argentina")
            }
          `,
        })
        .expect('Content-Type', /json/)
        .expect(400)

      const data = res.body

      expect(data).toEqual(
        expect.objectContaining({
          errors: expect.any(Object),
        })
      )

      const { errors } = data

      expect(Array.isArray(errors)).toBe(true)

      const error = errors[0]

      expect(Object.keys(error)).toEqual(
        expect.arrayContaining(['message', 'locations', 'extensions'])
      )
      expect(error.message).toEqual(`Expected type Int!, found "${id}".`)
      expect(error.extensions.code).toBe('GRAPHQL_VALIDATION_FAILED')
    },
    TIMEOUT
  )
})
