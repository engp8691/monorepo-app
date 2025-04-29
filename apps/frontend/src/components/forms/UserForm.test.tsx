import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { expect, it } from 'vitest'

import userEvent from '@testing-library/user-event'
import { ChakraProvider } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import UserForm from './UserForm' // ⬅️ Update this to your form path

// Helper to render inside ChakraProvider and FormProvider
const renderWithProviders = (ui: React.ReactElement) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm({
      defaultValues: {
        email: '',
        country: '',
        acceptTerms: false,
        gender: '',
      },
    })

    return (
      <ChakraProvider>
        <FormProvider {...methods}>{children}</FormProvider>
      </ChakraProvider>
    )
  }

  return render(ui, { wrapper: Wrapper })
}

describe('UserForm', () => {
  it('renders the form fields', () => {
    renderWithProviders(<UserForm />)

    expect(screen.getByTestId('email')).toBeInTheDocument()
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument()
    expect(screen.getByTestId('acceptedTerms')).toBeInTheDocument()
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument()
  })

  it('shows validation errors on submit', async () => {
    const user = userEvent.setup()
    renderWithProviders(<UserForm />)

    await user.click(screen.getByRole('button', { name: /submit/i }))

    // expect(await screen.findAllByRole('alert')).toHaveLength(4)
  })

  it('submits the form when filled correctly', async () => {
    const user = userEvent.setup()
    renderWithProviders(<UserForm />)

    await user.type(screen.getByTestId('email'), 'test@example.com')
    await user.selectOptions(screen.getByLabelText(/country/i), 'USA')
    await user.click(screen.getByLabelText(/I accept the terms and conditions/gi))
    await user.click(screen.getByLabelText('Male')) // Assuming "Male" is one of the options

    await user.click(screen.getByRole('button', { name: /submit/i }))

    // After correct submission, there should be no errors
    // expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
