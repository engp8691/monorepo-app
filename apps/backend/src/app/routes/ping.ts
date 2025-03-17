import { FastifyPluginAsync } from 'fastify'

const pingRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    '/ping',
    {
      schema: {
        description: 'Ping endpoint',
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async () => {
      return { message: 'pong' }
    }
  )
}

export default pingRoute
