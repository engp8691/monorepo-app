import { FastifyPluginAsync, FastifyRequest } from 'fastify'
import Employee from '../../models/employee'
import { Type } from '@sinclair/typebox'

const EmployeeQuerySchema =  Type.Object({
    page: Type.Optional(Type.String({ default: '1' })),
    pageSize: Type.Optional(Type.String({ default: '100' }))
})

const employeeRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/employees', {
      schema: {
        querystring: EmployeeQuerySchema,
        response: {
          200: Type.Array(Type.Object({
            emp_no: Type.Number(),
            first_name: Type.String(),
            last_name: Type.String(),
            hire_date: Type.String({ format: 'date-time' })
          })),
        },
      },
    }, 
    async (request: FastifyRequest<{ Querystring: { page?: string, pageSize?: string } }>, reply) => {
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
  })
}

export default employeeRoutes
