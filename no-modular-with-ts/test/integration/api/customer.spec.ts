import supertest from 'supertest'
import { randomInt } from '../../utils'
import server from '../../../src/server'

const app = server.listen()
const TIMEOUT = 1000 * 60 * 30

afterAll(() => {
  app.close()
})

describe('GET /customers', () => {
  const request = supertest(app)

  it(
    'Should return a list of customers',
    async () => {
      const url = '/customers'
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(Array.isArray(data)).toBe(true)
      expect(Object.keys(data[0])).toEqual(
        expect.arrayContaining([
          'id',
          'first_name',
          'last_name',
          'address'
        ])
      )
    },
    TIMEOUT
  )

  it(
    'Should return a customer',
    async () => {
      const id = randomInt(1, 1000)
      const url = `/customers/${id}`
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(Object.keys(data)).toEqual(
        expect.arrayContaining([
          'id',
          'first_name',
          'last_name',
          'address',
        ])
      )

      expect(data.id).toBe(id)
    },
    TIMEOUT
  )

  it(
    'Should return not found when the customer not exists',
    async () => {
      const id = 1100
      const url = `/customers/${id}`
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(404)

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
      expect(title).toBe(`Customer ${id} not found`)
      expect(status).toBe(res.status)
      expect(detail).toEqual(expect.stringContaining('NotFoundError'))
      expect(instance).toBe(url)
    },
    TIMEOUT
  )

  it(
    'Should return bad request when the format the params id is invalid',
    async () => {
      const id = 'ABC'
      const url = `/customers/${id}`
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
    'Should return a customer with orders',
    async () => {
      const id = randomInt(1, 1000)
      const url = `/customers/${id}/orders`
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(Array.isArray(data)).toBe(true)
      expect(Object.keys(data[0])).toEqual(
        expect.arrayContaining([
          'id',
          'customer_id',
          'amount',
          'instructions'
        ])
      )
    },
    TIMEOUT
  )

  it(
    'Should return not found when the customer with orders not exists',
    async () => {
      const id = 1001
      const url = `/customers/${id}/orders`
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(404)

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
      expect(title).toBe(`Orders by Customer ${id} not found`)
      expect(status).toBe(res.status)
      expect(detail).toEqual(expect.stringContaining('NotFoundError'))
      expect(instance).toBe(url)
    },
    TIMEOUT
  )

  it(
    'Should return bad request when the format the params id is invalid',
    async () => {
      const id = 'ABC'
      const url = `/customers/${id}`
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
    'Should return a customer with an order',
    async () => {
      const id = 829
      const orderId = 1106
      const url = `/customers/${id}/orders/${orderId}`
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(Object.keys(data)).toEqual(
        expect.arrayContaining([
          'id',
          'customer_id',
          'amount',
          'instructions'
        ])
      )
    },
    TIMEOUT
  )

  it(
    'Should return not found when a customer with a order not exists',
    async () => {
      const id = 829
      const orderId = 1000
      const url = `/customers/${id}/orders/${orderId}`
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(404)

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
      expect(title).toBe(`Order ${orderId} by Customer ${id} not found`)
      expect(status).toBe(res.status)
      expect(detail).toEqual(expect.stringContaining('NotFoundError'))
      expect(instance).toBe(url)
    },
    TIMEOUT
  )

  it(
    'Should return a customer with orders and products',
    async () => {
      const id = 10
      const orderId = 2494
      const url = `/customers/${id}/orders/${orderId}/products`
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(200)

      const data = res.body

      expect(Array.isArray(data)).toBe(true)
      expect(Object.keys(data[0])).toEqual(
        expect.arrayContaining([
          'id',
          'order_id',
          'product_code',
          'quantity'
        ])
      )
    },
    TIMEOUT
  )

  it(
    'Should return bad request when an order not exists with products',
    async () => {
      const id = 10
      const orderId = 2500
      const url = `/customers/${id}/orders/${orderId}/products`
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(404)

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
      expect(title).toBe(`Order ${orderId} by Customer ${id} not found`)
      expect(status).toBe(res.status)
      expect(detail).toEqual(expect.stringContaining('NotFoundError'))
      expect(instance).toBe(url)
    },
    TIMEOUT
  )

  it(
    'Should return bad request when the products not exists into a order',
    async () => {
      const id = 792
      const orderId = 4992
      const url = `/customers/${id}/orders/${orderId}/products`
      const res = await request
        .get(url)
        .expect('Content-Type', /json/)
        .expect(404)

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
      expect(title).toBe(`Products by Order ${orderId} not found`)
      expect(status).toBe(res.status)
      expect(detail).toEqual(expect.stringContaining('NotFoundError'))
      expect(instance).toBe(url)
    },
    TIMEOUT
  )
})
