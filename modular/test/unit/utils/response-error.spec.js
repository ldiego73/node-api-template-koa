import ResponseError from '../../../src/utils/response-error'

describe('utils/response', () => {
  const ctx = {
    status: 404,
    url: '/api/not-found',
  }
  const err = new Error('Invalid argument')

  it('should define "Response" class', () => {
    expect(ResponseError).toBeDefined()
  })

  describe('Response.notFound(ctx)', () => {
    it('should return the "fail" response ', () => {
      const response = ResponseError.notFound(ctx)

      const { type, title, status, detail, instance } = response

      expect(ctx.status).toBe(404)
      expect(Object.keys(response)).toEqual(
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
      expect(status).toBe(404)
      expect(detail).toBe('')
      expect(instance).toBe('/api/not-found')
    })
  })

  describe('Response.internalServerError(ctx, params)', () => {
    it('should return the "error" response ', () => {
      const response = ResponseError.internalServerError(ctx, err)

      const { type, title, status, detail, instance } = response

      expect(ctx.status).toBe(500)
      expect(Object.keys(response)).toEqual(
        expect.arrayContaining([
          'type',
          'title',
          'status',
          'detail',
          'instance',
        ])
      )
      expect(type).toBe('about:blank')
      expect(title).toBe(err.message)
      expect(status).toBe(500)
      expect(detail).toBe(err.stack)
      expect(instance).toBe('/api/not-found')
    })
  })
})
