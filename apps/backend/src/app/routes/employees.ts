import { FastifyInstance, FastifyRequest } from 'fastify'
import Employee from '../../models/employee'
import { Type, Static } from '@sinclair/typebox'

const EmployeeQuerySchema = Type.Object({
  page: Type.Optional(Type.String({ default: '1' })),
  pageSize: Type.Optional(Type.String({ default: '100' })),
})

const RequestBodySchema = Type.Object({
  name: Type.String(),
})
type RequestBodyType = Static<typeof RequestBodySchema>

const employeeRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/employees',
    schema: {
      querystring: EmployeeQuerySchema,
      response: {
        200: Type.Array(
          Type.Object({
            emp_no: Type.Number(),
            first_name: Type.String(),
            last_name: Type.String(),
            hire_date: Type.String({ format: 'date-time' }),
          }),
        ),
      },
    },
    handler: async (
      request: FastifyRequest<{
        Querystring: { page?: string; pageSize?: string }
      }>,
      reply,
    ) => {
      try {
        // Get query parameters, with default values
        const page = Number(request.query.page) || 1
        const pageSize = Number(request.query.pageSize) || 100

        // Calculate offset
        const offset = (page - 1) * pageSize

        // Fetch employees with pagination
        const employees = await Employee.findAll({
          limit: pageSize,
          offset: offset,
        })

        return reply.send(employees)
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    },
  })
  fastify.route({
    method: 'POST',
    url: '/longrequest',
    schema: {
      body: RequestBodySchema,
      response: {
        200: Type.Object({
          greeting: Type.String(),
        }),
      },
    },
    handler: async (request, reply) => {
      try {
        const { name } = request.body as RequestBodyType
        await new Promise((resolve) => setTimeout(resolve, 5000))

        reply.code(200).send({ greeting: `Hello ${name}` })
      } catch (e) {
        const err = e as Error
        return reply.status(500).send({
          message: err.message,
        })
      }
    },
  })
}

export default employeeRoutes
