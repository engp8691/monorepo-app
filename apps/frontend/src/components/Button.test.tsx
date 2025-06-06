import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './Button'

describe('Button Component', () => {
  test('calls onClick when clicked', () => {
    const mockOnClick = vi.fn() // Mock function
    render(<Button onClick={mockOnClick} label="Click me" />)

    const button = screen.getByText('Click me')
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  test('renders the correct label', () => {
    render(<Button onClick={() => null} label="Submit" />)

    expect(screen.getByText('Submit')).toBeInTheDocument()
  })
})
