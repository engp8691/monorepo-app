import { Type } from '@sinclair/typebox'; 
import { FastifyInstance, FastifyRequest } from 'fastify';

const GreetingQuerySchema = Type.Object({
  username: Type.Optional(Type.String({ default: 'world' })),
});

export default async function (fastify: FastifyInstance) {
  fastify.get('/greeting', {
    schema: {
      querystring: GreetingQuerySchema,
      response: {
        200: Type.Object({
          greeting: Type.String(),
        }),
      },
    },
  }, async (request: FastifyRequest<{ Querystring: { username?: string } }>, _reply) => {
    const { username } = request.query;
    return { greeting: `Hello, ${username || 'world'}!` };
  });
}
