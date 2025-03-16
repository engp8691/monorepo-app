import Fastify, { FastifyInstance } from 'fastify';
import { faker } from '@faker-js/faker'
import { app } from './app';

describe('GET /greeting', () => {
  let server: FastifyInstance;
  const PERSON = faker.person.fullName()

  beforeEach(() => {
    server = Fastify();
    server.register(app);
  });

  it('should respond with a message without username as query parameter', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/greeting',
    });

    expect(response.json()).toEqual({ greeting: 'Hello, world!' });
  });

  it('should respond with a message with username as query parameter', async () => {
    const response = await server.inject({
      method: 'GET',
      url: `/greeting?username=${PERSON}`,
    });

    expect(response.json()).toEqual({ greeting: `Hello, ${PERSON}!` });
  });
});
