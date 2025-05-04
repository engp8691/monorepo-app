import Fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { vi } from 'vitest'
import employeeRoutes from '../routes/employees'
import Employee from '../../models/employee'

vi.mock('../../models/employee')

describe('GET /employees', () => {
  let fastify: ReturnType<typeof Fastify>

  beforeAll(async () => {
    fastify = Fastify().withTypeProvider<TypeBoxTypeProvider>()
    await fastify.register(employeeRoutes)
    await fastify.ready()
  })

  afterAll(async () => {
    await fastify.close()
  })

  test('should return employees with default pagination', async () => {
    // Mock Employee.findAll to return sample employees
    (Employee.findAll as jest.Mock).mockResolvedValue([
      { emp_no: 1, first_name: 'John', last_name: 'Doe', hire_date: '2020-01-01T00:00:00Z' },
      { emp_no: 2, first_name: 'Jane', last_name: 'Doe', hire_date: '2021-01-01T00:00:00Z' },
    ])

    const response = await fastify.inject({
      method: 'GET',
      url: '/employees',
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toEqual([
      { emp_no: 1, first_name: 'John', last_name: 'Doe', hire_date: '2020-01-01T00:00:00Z' },
      { emp_no: 2, first_name: 'Jane', last_name: 'Doe', hire_date: '2021-01-01T00:00:00Z' },
    ])
  })

  test('should return employees with custom pagination', async () => {
    (Employee.findAll as jest.Mock).mockResolvedValue([
      { emp_no: 3, first_name: 'Alice', last_name: 'Smith', hire_date: '2019-05-20T00:00:00Z' },
    ])

    const response = await fastify.inject({
      method: 'GET',
      url: '/employees?page=2&pageSize=1',
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toEqual([
      { emp_no: 3, first_name: 'Alice', last_name: 'Smith', hire_date: '2019-05-20T00:00:00Z' },
    ])
    expect(Employee.findAll).toHaveBeenCalledWith({ limit: 1, offset: 1 })
  })

  test('should return 500 if an error occurs', async () => {
    (Employee.findAll as jest.Mock).mockRejectedValue(new Error('Database error'))

    const response = await fastify.inject({
      method: 'GET',
      url: '/employees',
    })

    expect(response.statusCode).toBe(500)
    expect(JSON.parse(response.body)).toEqual({ error: 'Internal Server Error' })
  })
})
