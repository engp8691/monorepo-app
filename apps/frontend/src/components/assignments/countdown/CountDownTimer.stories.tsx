import { Meta, StoryObj } from '@storybook/react'
import CountDownTimer from './CountDownTimer'

const meta: Meta<typeof CountDownTimer> = {
  title: 'Forms/CountDownTimer',
  component: CountDownTimer,
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
}

export default meta

type Story = StoryObj<typeof CountDownTimer>

export const Default: Story = {}