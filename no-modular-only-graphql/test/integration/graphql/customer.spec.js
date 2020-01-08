import supertest from 'supertest'

import server from '../../../src/server'

const app = server.listen()
const TIMEOUT = 1000 * 60 * 30

afterAll(() => {
  app.close()
})

describe('POST /graphql => customers', () => {
  const request = supertest(app)

  it(
    'Should return a list of customers',
    async () => {
      const res = await request
        .post(`/graphql`)
        .send({
          query: `{
            customers {
              id
              first_name
              last_name
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

      const { customers } = data.data

      expect(Array.isArray(customers)).toBe(true)
      expect(Object.keys(customers[0])).toEqual(
        expect.arrayContaining(['id', 'first_name', 'last_name'])
      )
    },
    TIMEOUT
  )

  it(
    'Should return one customer',
    async () => {
      const id = parseInt(Math.random(1000) * 1000)
      const res = await request
        .post(`/graphql`)
        .send({
          query: `{
            customer(id: ${id}) {
              id
              first_name
              last_name
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

      const { customer } = data.data
      expect(Object.keys(customer)).toEqual(
        expect.arrayContaining(['id', 'first_name', 'last_name'])
      )

      expect(customer.id).toBe(id)
    },
    TIMEOUT
  )

  it(
    'Should error when one customer parameter id is invalid',
    async () => {
      const id = 'ABC'
      const res = await request
        .post('/graphql')
        .send({
          query: `{
            customer(id: "${id}") {
              id
              first_name
              last_name
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

  it(
    'Should return a customer with orders',
    async () => {
      const id = parseInt(Math.random(150) * 100)
      const res = await request
        .post(`/graphql`)
        .send({
          query: `{
            customer(id: ${id}) {
              id
              first_name
              last_name
              orders {
                id
                amount
                instructions
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

      const { customer } = data.data
      const { orders } = customer

      expect(Array.isArray(orders)).toBe(true)
      expect(Object.keys(orders[0])).toEqual(
        expect.arrayContaining(['id', 'amount', 'instructions'])
      )

      expect(customer.id).toBe(id)
    },
    TIMEOUT
  )

  it(
    'Should return a customer with an order',
    async () => {
      const id = 829
      const orderId = 1106

      const res = await request
        .post(`/graphql`)
        .send({
          query: `{
            customer(id: ${id}) {
              id
              first_name
              last_name
              order(orderId: ${orderId}) {
                id
                amount
                instructions
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

      const { customer } = data.data
      const { order } = customer

      expect(Object.keys(order)).toEqual(
        expect.arrayContaining(['id', 'amount', 'instructions'])
      )

      expect(customer.id).toBe(id)
    },
    TIMEOUT
  )

  it(
    'Should return a customer with an order and products',
    async () => {
      const id = 10
      const orderId = 2494

      const res = await request
        .post(`/graphql`)
        .send({
          query: `{
            customer(id: ${id}) {
              id
              first_name
              last_name
              order(orderId: ${orderId}) {
                id
                amount
                instructions
                products {
                  id
                  quantity
                }
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

      const { customer } = data.data
      const { order } = customer
      const { products } = order

      expect(Array.isArray(products)).toBe(true)
      expect(Object.keys(products[0])).toEqual(
        expect.arrayContaining(['id', 'quantity'])
      )

      expect(customer.id).toBe(id)
    },
    TIMEOUT
  )

  it(
    'Should return orders by customer id',
    async () => {
      const id = 100
      const res = await request
        .post(`/graphql`)
        .send({
          query: `{
            orders(customerId: ${id}) {
              id
              amount
              instructions
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

      const { orders } = data.data

      expect(Array.isArray(orders)).toBe(true)
      expect(Object.keys(orders[0])).toEqual(
        expect.arrayContaining(['id', 'amount', 'instructions'])
      )
    },
    TIMEOUT
  )

  it(
    'Should return one order by id and customer id',
    async () => {
      const orderId = 3000
      const customerId = 491

      const res = await request
        .post(`/graphql`)
        .send({
          query: `{
            order(orderId: ${orderId}, customerId: ${customerId}) {
              id
              amount
              instructions
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

      const { order } = data.data

      expect(Object.keys(order)).toEqual(
        expect.arrayContaining(['id', 'amount', 'instructions'])
      )
    },
    TIMEOUT
  )

  it(
    'Should return products by order id',
    async () => {
      const orderId = 1500
      const res = await request
        .post(`/graphql`)
        .send({
          query: `{
            products(orderId: ${orderId}) {
              id
              product_code
              quantity
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

      const { products } = data.data

      expect(Array.isArray(products)).toBe(true)
      expect(Object.keys(products[0])).toEqual(
        expect.arrayContaining(['id', 'product_code', 'quantity'])
      )
    },
    TIMEOUT
  )
})
