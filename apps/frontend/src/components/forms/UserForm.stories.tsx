import { Meta, StoryObj } from '@storybook/react'
import { ChakraProvider } from '@chakra-ui/react'
import UserForm from './UserForm'
import { theme } from '../../theme/theme2'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
// import { theme } from '../../theme/theme'

const meta: Meta<typeof UserForm> = {
  title: 'Forms/UserForm',
  component: UserForm,
  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>
        <MemoryRouter initialEntries={['/form1']}>
          <Routes>
            <Route path="/form1" element={<Story />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof UserForm>

export const Default: Story = {}
