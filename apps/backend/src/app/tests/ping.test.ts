import Fastify, { FastifyInstance } from 'fastify'
import pingRoute from '../routes/ping' // Update path if needed

describe('Ping Route', () => {
  let fastify: FastifyInstance

  // Setup Fastify before each test
  beforeEach(async () => {
    fastify = Fastify()
    fastify.register(pingRoute) // Register your route here
    await fastify.ready() // Ensure Fastify is ready before tests run
  })

  // Cleanup after each test
  afterEach(async () => {
    await fastify.close()
  })

  // Unit test for /ping route
  it('should return 200 and message "pong"', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/ping',
    })

    expect(response.statusCode).toBe(200) // Check status code
    expect(response.json()).toEqual({ message: 'pong' }) // Check response body
  })
})
