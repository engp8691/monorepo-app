import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { expect, it } from 'vitest'

import userEvent from '@testing-library/user-event'
import { ChakraProvider } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import UserForm from './UserForm'

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
    const alerts = await screen.findAllByRole('alert')
    expect(alerts).toHaveLength(6)
  })

  it('submits the form when filled correctly', async () => {
    const user = userEvent.setup()
    renderWithProviders(<UserForm />)

    const theForm = screen.getByTestId('the-form-test-id')

    await user.type(within(theForm).getByTestId('name'), 'John')
    await user.type(within(theForm).getByTestId('email'), 'test@example.com')
    await user.type(within(theForm).getByTestId('age'), '30')
    await user.selectOptions(within(theForm).getByLabelText(/country/i), 'USA')
    await user.click(within(theForm).getByLabelText(/I accept the terms and conditions/gi))
    await user.click(within(theForm).getByLabelText('Male'))

    await user.click(within(theForm).getByRole('button', { name: /submit/i }))
    expect(await within(theForm).queryAllByRole('alert')).toHaveLength(0)
  })
})
