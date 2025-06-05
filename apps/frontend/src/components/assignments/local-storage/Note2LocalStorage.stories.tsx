import { Meta, StoryObj } from '@storybook/react'
import Note2LocalStorage from './Note2LocalStorage'

const meta: Meta<typeof Note2LocalStorage> = {
  title: 'Forms/Note2LocalStorage',
  component: Note2LocalStorage,
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Note2LocalStorage>

export const Default: Story = {}