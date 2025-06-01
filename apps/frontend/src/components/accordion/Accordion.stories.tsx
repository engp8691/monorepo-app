import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './Accordion'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../../theme/theme2'
import { http, HttpResponse } from 'msw'

const items = [
  { title: 'Section 1', content: 'Content for section 1' },
  { title: 'Section 2', content: 'Content for section 2' },
  { title: 'Section 3', content: 'Content for section 3' },
]

const meta: Meta<typeof Accordion> = {
  title: 'Example/Accordion',
  component: Accordion,
  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    items: [],
  },
  parameters: {},
}

export const Primay: Story = {
  args: {
    items,
  },
  parameters: {
    msw: [
      http.get('http://localhost:5000/greeting', async () => {
        return HttpResponse.json({ greeting: 'Hello Mock' })
      }),
    ],
  },
}

