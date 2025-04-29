import { Meta, StoryObj } from '@storybook/react'
import { Box, ChakraProvider } from '@chakra-ui/react'
import UserForm from './UserForm'
import { theme } from '../../theme/theme'

const meta: Meta<typeof UserForm> = {
  title: 'Forms/UserForm',
  component: UserForm,
  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>
        <Box p={8} maxW="600px">
          <Story />
        </Box>
      </ChakraProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof UserForm>

export const Default: Story = {}
