import { Meta, StoryObj } from '@storybook/react'
import DebounceSearch from './DebounceSearch'

const meta: Meta<typeof DebounceSearch> = {
  title: 'Forms/DebounceSearch',
  component: DebounceSearch,
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
}

export default meta

type Story = StoryObj<typeof DebounceSearch>

export const Default: Story = {}