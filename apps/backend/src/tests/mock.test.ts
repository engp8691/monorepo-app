import axios from 'axios'
import { vi } from 'vitest'

vi.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

test('mock axios get', async () => {
  mockedAxios.get.mockResolvedValue({ data: { message: 'Hello' } })

  const res = await axios.get('/api')
  expect(res.data.message).toBe('Hello')
})

