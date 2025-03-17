import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

import App from './app'

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />)
    expect(baseElement).toBeTruthy()
  })

  it('should have a greeting as the title', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          greeting: 'Hello, World!',
         }),
      })
    ) as unknown as ReturnType<typeof vi.fn>

    render(<App />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/Hello, World!/i)).toBeInTheDocument()
    })
  })
})
