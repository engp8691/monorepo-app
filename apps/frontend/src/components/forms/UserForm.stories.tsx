import { Meta, StoryObj } from '@storybook/react'
import { ChakraProvider } from '@chakra-ui/react'
import UserForm from './UserForm'
import { theme } from '../../theme/theme2'
// import { theme } from '../../theme/theme'

const meta: Meta<typeof UserForm> = {
  title: 'Forms/UserForm',
  component: UserForm,
  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof UserForm>

export const Default: Story = {}
