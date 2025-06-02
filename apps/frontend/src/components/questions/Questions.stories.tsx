import { Meta, StoryObj } from '@storybook/react'
import ShowQuestion from '.'

const meta: Meta<typeof ShowQuestion> = {
  title: 'Forms/Questions',
  component: ShowQuestion,
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ShowQuestion>

export const Default: Story = {}