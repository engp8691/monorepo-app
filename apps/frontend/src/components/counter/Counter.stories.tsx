import { Meta, StoryObj } from '@storybook/react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../../theme/theme2'
import { Counter } from './Counter'
import { StoreProvider } from '../../context/store'

const meta: Meta<typeof Counter> = {
  title: 'Forms/Counter',
  component: Counter,
  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>
        <StoreProvider>
          <Story />
        </StoreProvider>
      </ChakraProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Counter>

export const Default: Story = {}