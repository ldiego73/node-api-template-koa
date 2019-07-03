import supertest from 'supertest'
import { randomInt } from '../../utils'
import server from '../../../src/server'

const app = server.listen()
const TIMEOUT = 1000 * 60 * 30

afterAll(() => {
  app.close()
})

describe('GET /pokemon', () => {
  const request = supertest(app)

  it(
    'Should return one pokemon by id',
    async () => {
      const id = randomInt(1, 150)
      const res = await request
        .post('/graphql')
        .send({
          query: `{
            pokemon(id: ${id}) {
              id
              name
              base_experience
              images {
                normal
                shiny
              }
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

      const { pokemon } = data.data
      expect(Object.keys(pokemon)).toEqual(
        expect.arrayContaining(['id', 'name', 'base_experience', 'images'])
      )
      expect(pokemon.id).toBe(id)
      expect(Object.keys(pokemon.images)).toEqual(
        expect.arrayContaining(['normal', 'shiny'])
      )
    },
    TIMEOUT
  )

  it(
    'Should return list pokemones by ids',
    async () => {
      const id1 = randomInt(1, 150)
      const id2 = randomInt(1, 150)
      const id3 = randomInt(1, 150)

      const res = await request
        .post('/graphql')
        .send({
          query: `
            query pokemones($ids: PokemonInput!) {
              pokemones(ids: $ids) {
                id
                name
                base_experience
                images {
                  normal
                  shiny
                }
              }
            }
          `,
          variables: {
            ids: {
              id: [id1, id2, id3],
            },
          },
        })
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(data).toEqual(
        expect.objectContaining({
          data: expect.any(Object),
        })
      )

      const { pokemones } = data.data
      expect(Array.isArray(pokemones)).toBe(true)

      const pokemon = pokemones[0]

      expect(Object.keys(pokemon)).toEqual(
        expect.arrayContaining(['id', 'name', 'base_experience', 'images'])
      )
      expect(pokemon.id).toBe(id1)
      expect(Object.keys(pokemon.images)).toEqual(
        expect.arrayContaining(['normal', 'shiny'])
      )
    },
    TIMEOUT
  )

  it(
    'Should return error when the pokemon not found',
    async () => {
      const res = await request
        .post('/graphql')
        .send({
          query: `{
            pokemon(id: 10000) {
              id
              name
              base_experience
              images {
                normal
                shiny
              }
            }
          }`,
        })
        .expect('Content-Type', /json/)
        .expect(200)

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
      expect(error.message).toEqual('Request failed with status code 404')
      expect(error.extensions.code).toBe('INTERNAL_SERVER_ERROR')
    },
    TIMEOUT
  )

  it(
    'Should return error when the pokemon id has a parament invalid',
    async () => {
      const id = 'ABC'
      const res = await request
        .post('/graphql')
        .send({
          query: `{
            pokemon(id: "${id}") {
              id
              name
              base_experience
              images {
                normal
                shiny
              }
            }
          }`,
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
